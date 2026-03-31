import Stripe from "stripe";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/doctor.js";
import dotenv from "dotenv";
import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/clerk-sdk-node";
dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MAJOR_ADMIN_ID = process.env.MAJOR_ADMIN_ID;

const safeNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const buildFrontendBase = (req) => {
  if (FRONTEND_URL) return FRONTEND_URL.replace(/\/$/, "");
  const origin = req.get("origin") || req.get("referer");
  if (origin) return origin.replace(/\/$/, "");
  const host = req.get("host");
  if (host) return `${req.protocol || "http"}://${host}`.replace(/\/$/, "");
  return null;
};

const resolveClerkUserId = (req) => {
  const auth = req.auth || {};
  return auth?.userId || auth?.user_id || auth?.user?.id || req.user?.id || getAuth(req)?.userId || null;
};

const buildFilter = (query) => {
  const filter = {};
  const { doctorId, mobile, status, search, patientClerkId, createdBy } = query;
  
  if (doctorId) filter.doctorId = doctorId;
  if (mobile) filter.mobile = mobile;
  if (status) filter.status = status;
  if (patientClerkId || createdBy) filter.createdBy = patientClerkId || createdBy;
  if (search) {
    const re = new RegExp(search, "i");
    filter.$or = [{ patientName: re }, { mobile: re }, { notes: re }];
  }
  return filter;
};

export const getAppointments = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const limitNum = Math.min(200, Math.max(1, parseInt(limit)));
    const pageNum = Math.max(1, parseInt(page));
    const skip = (pageNum - 1) * limitNum;

    const filter = buildFilter(req.query);
    const items = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("doctorId", "name specialization owner imageUrl image")
      .lean();

    const total = await Appointment.countDocuments(filter);
    return res.json({ success: true, appointments: items, meta: { page: pageNum, limit: limitNum, total, count: items.length } });
  } catch (err) {
    console.error("getAppointments:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id).populate("doctorId", "name specialization owner imageUrl image").lean();
    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });
    return res.json({ success: true, appointment: appt });
  } catch (err) {
    console.error("getAppointmentById:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const createdBy = req.query.createdBy || resolveClerkUserId(req);
    if (!createdBy && !req.query.mobile) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const filter = {};
    if (createdBy) filter.createdBy = createdBy;
    if (req.query.mobile) filter.mobile = req.query.mobile;

    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 }).lean();
    return res.json({ success: true, appointments });
  } catch (err) {
    console.error("getAppointmentsByPatient:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getDoctorInfo = async (doctorId, body = {}) => {
  const doctor = await Doctor.findById(doctorId).lean();
  if (!doctor) return null;

  return {
    doctorName: doctor.name || body.doctorName || "",
    speciality: doctor.specialization || doctor.speciality || body.speciality || "",
    doctorImage: {
      url: doctor.imageUrl || doctor.image || body.doctorImageUrl || "",
      publicId: doctor.imagePublicId || body.doctorImagePublicId || ""
    },
    owner: body.owner || doctor.owner || MAJOR_ADMIN_ID || String(doctorId)
  };
};

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, patientName, mobile, date, time, fee, fees, notes = "", email, paymentMethod } = req.body;
    const clerkUserId = resolveClerkUserId(req);
    
    if (!clerkUserId || !doctorId || !patientName || !mobile || !date || !time) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const numericFee = safeNumber(fee ?? fees ?? 0);
    if (numericFee === null || numericFee < 0) {
      return res.status(400).json({ success: false, message: "Invalid fee" });
    }

    const existingBooking = await Appointment.findOne({
      doctorId, createdBy: clerkUserId, date, time, status: { $ne: "Canceled" }
    }).lean();

    if (existingBooking) {
      return res.status(409).json({ success: false, message: "Appointment already exists at this time" });
    }

    const doctorInfo = await getDoctorInfo(doctorId, req.body);
    if (!doctorInfo) return res.status(404).json({ success: false, message: "Doctor not found" });

    const base = {
      doctorId,
      ...doctorInfo,
      patientName: patientName.trim(),
      mobile: mobile.trim(),
      age: req.body.age ? Number(req.body.age) : undefined,
      gender: req.body.gender || "",
      date,
      time,
      fees: numericFee,
      notes,
      createdBy: clerkUserId,
      payment: { method: paymentMethod === "Cash" ? "Cash" : "Online", status: "Pending", amount: numericFee }
    };

    if (numericFee === 0) {
      const created = await Appointment.create({
        ...base,
        status: "Confirmed",
        payment: { ...base.payment, status: "Paid", amount: 0 },
        paidAt: new Date()
      });
      return res.status(201).json({ success: true, appointment: created, checkoutUrl: null });
    }

    if (paymentMethod === "Cash") {
      const created = await Appointment.create({ ...base, status: "Pending" });
      return res.status(201).json({ success: true, appointment: created, checkoutUrl: null });
    }

    if (!stripe) return res.status(500).json({ success: false, message: "Stripe not configured" });

    const frontBase = buildFrontendBase(req);
    if (!frontBase) return res.status(500).json({ success: false, message: "Frontend URL not determined" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: `Appointment - ${patientName.slice(0, 40)}` },
          unit_amount: Math.round(numericFee * 100)
        },
        quantity: 1
      }],
      success_url: `${frontBase}/appointment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontBase}/appointment/cancel`,
      metadata: { doctorId, patientName: base.patientName, mobile: base.mobile, clerkUserId }
    });

    const created = await Appointment.create({
      ...base,
      sessionId: session.id,
      payment: { ...base.payment, providerId: session.payment_intent }
    });

    return res.status(201).json({ success: true, appointment: created, checkoutUrl: session.url });
  } catch (err) {
    console.error("createAppointment:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id || !stripe) return res.status(400).json({ success: false, message: "Invalid request" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const updateData = {
      "payment.status": "Paid",
      "payment.providerId": session.payment_intent,
      status: "Confirmed",
      paidAt: new Date(),
      sessionId: session_id
    };

    let appt = await Appointment.findOneAndUpdate({ sessionId: session_id }, updateData, { new: true });

    if (!appt && session.metadata?.doctorId) {
      appt = await Appointment.findOneAndUpdate(
        { doctorId: session.metadata.doctorId, mobile: session.metadata.mobile, patientName: session.metadata.patientName },
        updateData, { new: true }
      );
    }

    if (!appt) {
      const amount = Math.round((session.amount_total || 0) / 100);
      const fifteenAgo = new Date(Date.now() - 1000 * 60 * 15);
      appt = await Appointment.findOneAndUpdate(
        { fees: amount, createdAt: { $gte: fifteenAgo } },
        updateData, { new: true }
      );
    }

    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });
    return res.json({ success: true, appointment: appt });
  } catch (err) {
    console.error("confirmPayment:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });

    if ((appt.status === "Completed" || appt.status === "Canceled") && req.body.status !== appt.status) {
      return res.status(400).json({ success: false, message: "Cannot change status of completed/canceled appointment" });
    }

    const update = {};
    if (req.body.status) update.status = req.body.status;
    if (req.body.notes !== undefined) update.notes = req.body.notes;

    if (req.body.date && req.body.time && appt.status !== "Completed" && appt.status !== "Canceled") {
      update.date = req.body.date;
      update.time = req.body.time;
      update.status = "Rescheduled";
      update.rescheduledTo = { date: req.body.date, time: req.body.time };
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate("doctorId", "name imageUrl").lean();

    return res.json({ success: true, appointment: updated });
  } catch (err) {
    console.error("updateAppointment:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });

    appt.status = "Canceled";
    await appt.save();
    return res.json({ success: true, appointment: appt });
  } catch (err) {
    console.error("cancelAppointment:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getStats = async (req, res) => {
  try {
    const [total, paidAgg, recent] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.aggregate([{ $match: { "payment.status": "Paid" } }, { $group: { _id: null, total: { $sum: "$fees" } } }]),
      Appointment.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } })
    ]);

    return res.json({ 
      success: true, 
      stats: { total, revenue: (paidAgg[0]?.total) || 0, recentLast7Days: recent } 
    });
  } catch (err) {
    console.error("getStats:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    if (!doctorId) return res.status(400).json({ success: false, message: "doctorId required" });

    const { limit = 50, page = 1 } = req.query;
    const limitNum = Math.min(200, Math.max(1, parseInt(limit)));
    const pageNum = Math.max(1, parseInt(page));
    const skip = (pageNum - 1) * limitNum;

    const filter = { doctorId, ...buildFilter(req.query) };
    const items = await Appointment.find(filter)
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(limitNum)
      .populate("doctorId", "name specialization owner imageUrl image")
      .lean();

    const total = await Appointment.countDocuments(filter);
    return res.json({ success: true, appointments: items, meta: { page: pageNum, limit: limitNum, total, count: items.length } });
  } catch (err) {
    console.error("getAppointmentsByDoctor:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getRegisteredUserCount = async (req, res) => {
  try {
    const totalUsers = await clerkClient.users.getCount();
    return res.json({ success: true, totalUsers });
  } catch (err) {
    console.error("getRegisteredUserCount:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default {
  getAppointments,
  getAppointmentById,
  getAppointmentsByPatient,
  createAppointment,
  confirmPayment,
  updateAppointment,
  cancelAppointment,
  getStats,
  getAppointmentsByDoctor,
  getRegisteredUserCount,
};

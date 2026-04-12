import Stripe from "stripe";
import dotenv from "dotenv";
import ServiceAppointment from "../models/serviceAppointment.js";

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

import mongoose from "mongoose";

export const createServiceAppointment = async (req, res) => {
  try {
    const newAppt = new ServiceAppointment(req.body);
    const saved = await newAppt.save();
    return res.status(201).json({ success: true, appointment: saved });
  } catch (err) {
    console.error("createServiceAppointment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getServiceAppointments = async (req, res) => {
  try {
    const apps = await ServiceAppointment.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, appointments: apps });
  } catch (err) {
    console.error("getServiceAppointments error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getServiceAppointmentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const app = await ServiceAppointment.findById(req.params.id).lean();
    if (!app) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, appointment: app });
  } catch (err) {
    console.error("getServiceAppointmentById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getServiceAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = req.query.patientId || req.query.createdBy;
    if (!patientId && !req.query.mobile) return res.status(400).json({ success: false, message: "Missing params" });
    const filter = {};
    if (patientId) filter.createdBy = patientId;
    if (req.query.mobile) filter.mobile = req.query.mobile;
    const apps = await ServiceAppointment.find(filter).sort({ date: 1 }).lean();
    return res.status(200).json({ success: true, appointments: apps });
  } catch (err) {
    console.error("getServiceAppointmentsByPatient error:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.toString(), stack: err.stack });
  }
};

export const updateServiceAppointment = async (req, res) => {
  try {
    const updated = await ServiceAppointment.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, appointment: updated });
  } catch (err) {
    console.error("updateServiceAppointment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelServiceAppointment = async (req, res) => {
  try {
    const app = await ServiceAppointment.findById(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: "Not found" });
    app.status = "Canceled";
    await app.save();
    return res.status(200).json({ success: true, appointment: app });
  } catch (err) {
    console.error("cancelServiceAppointment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const confirmServicePayment = async (req, res) => {
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
      "payment.paidAt": new Date(),
      "payment.sessionId": session_id,
    };

    let appt = await ServiceAppointment.findOneAndUpdate({ "payment.sessionId": session_id }, updateData, { new: true });


    if (!appt) {
      const amount = Math.round((session.amount_total || 0) / 100);
      const fifteenAgo = new Date(Date.now() - 1000 * 60 * 15);
      appt = await ServiceAppointment.findOneAndUpdate(
        { fees: amount, createdAt: { $gte: fifteenAgo }, "payment.status": { $ne: "Paid" } },
        updateData, { new: true }
      );
    }

    if (!appt) return res.status(404).json({ success: false, message: "Appointment not found" });
    return res.json({ success: true, appointment: appt });
  } catch (err) {
    console.error("confirmServicePayment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getServiceStats = async (req, res) => {
  try {
    const [total, paidAgg, recent] = await Promise.all([
      ServiceAppointment.countDocuments(),
      ServiceAppointment.aggregate([{ $match: { "payment.status": "Paid" } }, { $group: { _id: null, total: { $sum: "$fees" } } }]),
      ServiceAppointment.countDocuments({ createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } })
    ]);

    return res.json({
      success: true,
      stats: { total, revenue: (paidAgg[0]?.total) || 0, recentLast7Days: recent }
    });
  } catch (err) {
    console.error("getServiceStats:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

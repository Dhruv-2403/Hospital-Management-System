import ServiceAppointment from "../models/serviceAppointment.js";

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
    return res.status(500).json({ success: false, message: "Server error" });
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

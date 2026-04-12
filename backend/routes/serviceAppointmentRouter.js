import express from "express";
import {
  createServiceAppointment,
  getServiceAppointments,
  getServiceAppointmentsByPatient,
  getServiceAppointmentById,
  updateServiceAppointment,
  cancelServiceAppointment,
  confirmServicePayment,
  getServiceStats,
} from "../controllers/serviceAppointmentController.js";

const router = express.Router();

router.get("/", getServiceAppointments);
router.post("/", createServiceAppointment);

// Named/static routes MUST come before /:id
router.get("/patient", getServiceAppointmentsByPatient);
router.get("/me", getServiceAppointmentsByPatient); // alias used by AppointmentPage frontend
router.get("/confirm", confirmServicePayment);   // used by VerifyServicePaymentPage
router.get("/stats/summary", getServiceStats);   // used by ServiceDashboard stats panel

// Parameterised routes LAST
router.get("/:id", getServiceAppointmentById);
router.put("/:id", updateServiceAppointment);
router.patch("/:id/cancel", cancelServiceAppointment);

export default router;

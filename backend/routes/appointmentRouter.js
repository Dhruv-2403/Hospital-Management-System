import express from "express";
import {
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
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", createAppointment);

// Named/static routes MUST come before /:id
router.get("/patient", getAppointmentsByPatient);
router.get("/me", getAppointmentsByPatient); // alias used by AppointmentPage frontend
router.get("/stats", getStats);
router.get("/users/count", getRegisteredUserCount);
router.get("/payment/confirm", confirmPayment);
router.get("/confirm", confirmPayment);        // alias used by VerifyPaymentPage
router.get("/doctor/:doctorId", getAppointmentsByDoctor);

// Parameterised routes LAST
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.patch("/:id/cancel", cancelAppointment);

export default router;

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
router.get("/patient", getAppointmentsByPatient);
router.get("/doctor/:doctorId", getAppointmentsByDoctor);
router.get("/stats", getStats);
router.get("/users/count", getRegisteredUserCount);
router.get("/payment/confirm", confirmPayment);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.patch("/:id/cancel", cancelAppointment);

export default router;

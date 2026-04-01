import express from "express";
import {
  createServiceAppointment,
  getServiceAppointments,
  getServiceAppointmentsByPatient,
  getServiceAppointmentById,
  updateServiceAppointment,
  cancelServiceAppointment,
} from "../controllers/serviceAppointmentController.js";

const router = express.Router();

router.get("/", getServiceAppointments);
router.post("/", createServiceAppointment);
router.get("/patient", getServiceAppointmentsByPatient);
router.get("/:id", getServiceAppointmentById);
router.put("/:id", updateServiceAppointment);
router.patch("/:id/cancel", cancelServiceAppointment);

export default router;

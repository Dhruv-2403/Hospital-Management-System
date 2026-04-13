import express from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  toggleAvailability,
  doctorLogin,
} from "../controllers/doctorController.js";
import upload from "../middlewares/multer.js";
import doctorAuth from "../middlewares/doctorAuth.js";

const router = express.Router();

// Public routes
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/login", doctorLogin);

// Protected routes (require auth or image upload handling)
router.post("/", upload.single("image"), createDoctor);
router.put("/:id", upload.single("image"), updateDoctor);
router.delete("/:id", deleteDoctor);
router.patch("/:id/availability", toggleAvailability);

export default router;

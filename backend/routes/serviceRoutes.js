import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createService);
router.get("/", getServices);
router.get("/:id", getServiceById);
router.put("/:id", upload.single("image"), updateService);
router.delete("/:id", deleteService);

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import doctorRouter from "./routes/doctorRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceAppointmentRouter from "./routes/serviceAppointmentRouter.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/doctors", doctorRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/services", serviceRoutes);
app.use("/api/service-appointments", serviceAppointmentRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Hospital Management API is running...");
});

// Database and Server Setup
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/hospital-management";

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

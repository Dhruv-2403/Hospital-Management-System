import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import doctorRouter from "./routes/doctorRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceAppointmentRouter from "./routes/serviceAppointmentRouter.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/doctors", doctorRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api/services", serviceRoutes);
app.use("/api/service-appointments", serviceAppointmentRouter);

app.get("/", (req, res) => {
  res.send("Hospital Management API is running...");
});

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGODB_URI

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

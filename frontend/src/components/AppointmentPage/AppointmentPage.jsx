import { useState } from "react";
import { appointments, bookedServices } from "./dummyAppointment";
import "./AppointmentPage.css";

export default function AppointmentPage() {
    const [activeTab, setActiveTab] = useState("doctors");

    const doctorAppointments = appointments.map((a) => ({
        id: "d" + a.id,
        type: "doctor",
        status: (a.status || "upcoming").toLowerCase(),
        date: a.date,
        time: a.time,
        subjectName: a.doctor,
        detail: a.specialization,
        fee: a.payment === "Online" ? "Paid" : "Cash"
    }));

    const serviceAppointments = bookedServices.map((a) => ({
        id: "s" + a.id,
        type: "service",
        status: (a.status || "upcoming").toLowerCase(),
        date: a.date,
        time: a.time,
        subjectName: a.name,
        detail: "Service Booking",
        fee: a.price
    }));

    const currentList = activeTab === "doctors" ? doctorAppointments : serviceAppointments;

    return (
        <div className="appt-page">
            <div className="appt-tabs">
                <button
                    className={`appt-tab ${activeTab === "doctors" ? "active" : ""}`}
                    onClick={() => setActiveTab("doctors")}
                >
                    Doctor Appointments
                </button>
                <button
                    className={`appt-tab ${activeTab === "service" ? "active" : ""}`}
                    onClick={() => setActiveTab("service")}
                >
                    Service Bookings
                </button>
            </div>

            <div className="appt-list" key={activeTab}>
                {currentList.length === 0 ? (
                    <p className="no-appts">You have no {activeTab} appointments booked.</p>
                ) : (
                    currentList.map((appt) => (
                        <div key={appt.id} className="appt-card">
                            <div className="appt-card-header">
                                <span className={`badge badge-${appt.status === "completed" ? "green" : appt.status === "cancelled" ? "red" : "blue"}`}>
                                    {appt.status.toUpperCase()}
                                </span>
                                <span className="appt-date">{appt.date} • {appt.time}</span>
                            </div>
                            <div className="appt-card-body">
                                <h3>{appt.subjectName}</h3>
                                <p className="appt-info">{appt.detail}</p>
                                <div className="appt-footer-actions">
                                    <span className="appt-fee">₹{appt.fee}</span>
                                    {appt.status === "upcoming" && (
                                        <button className="btn btn-danger btn-sm">Cancel</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

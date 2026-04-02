import { useState } from "react";
import dummyAppointments from "../../components/AppointmentPage/dummyAppointment";
import "./AppointmentPage.css";

export default function AppointmentPage() {
    const [activeTab, setActiveTab] = useState("doctors");

    // Since it's dummy data, we just use it directly
    const doctorAppointments = dummyAppointments.filter((a) => a.type === "doctor");
    const serviceAppointments = dummyAppointments.filter((a) => a.type === "service");

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

            <div className="appt-list">
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

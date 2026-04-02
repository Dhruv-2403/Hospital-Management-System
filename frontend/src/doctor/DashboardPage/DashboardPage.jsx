import dummyAppointment from "../../../components/AppointmentPage/dummyAppointment";
import { FaUsers, FaCalendarCheck, FaChartLine, FaWallet } from "react-icons/fa";
import "./DashboardPage.css";

export default function DashboardPage() {
    const stats = [
        { label: "Total Patients", value: "1,240", icon: <FaUsers />, color: "#3b82f6" },
        { label: "Appointments", value: "320", icon: <FaCalendarCheck />, color: "#10b981" },
        { label: "Total Revenue", value: "₹4.5L", icon: <FaWallet />, color: "#8b5cf6" },
        { label: "Growth", value: "+12%", icon: <FaChartLine />, color: "#f59e0b" },
    ];

    return (
        <div className="doc-dashboard">
            <div className="dash-stats">
                {stats.map((s) => (
                    <div key={s.label} className="stat-card">
                        <div className="stat-icon" style={{ background: s.color + "18", color: s.color }}>
                            {s.icon}
                        </div>
                        <div className="stat-info">
                            <p>{s.label}</p>
                            <h3>{s.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dash-table-wrap">
                <div className="dash-table-header">
                    <h3>Recent Appointments</h3>
                </div>
                <div className="table-responsive">
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Date / Time</th>
                                <th>Fee</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyAppointment.map((appt) => (
                                <tr key={appt.id}>
                                    <td>
                                        <strong>{appt.subjectName}</strong>
                                        <div style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>{appt.type} booking</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500 }}>{appt.date}</div>
                                        <div style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>{appt.time}</div>
                                    </td>
                                    <td style={{ fontWeight: 600, color: "var(--gray-700)" }}>₹{appt.fee}</td>
                                    <td>
                                        <span className={`badge badge-${appt.status === "completed" ? "green" : appt.status === "cancelled" ? "red" : "blue"}`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td>
                                        {appt.status === "upcoming" ? (
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <button className="btn btn-outline btn-sm" style={{ padding: "4px 10px", fontSize: "0.8rem" }}>Complete</button>
                                                <button className="btn btn-danger btn-sm" style={{ padding: "4px 10px", fontSize: "0.8rem" }}>Cancel</button>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: "0.85rem", color: "var(--gray-400)" }}>No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

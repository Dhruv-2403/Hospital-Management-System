import { useRef } from "react";
import { appointments, bookedServices } from "../../components/AppointmentPage/dummyAppointment";
import { FaUsers, FaCalendarCheck, FaChartLine, FaWallet } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./DashboardPage.css";

export default function DashboardPage() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".stat-card", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 })
          .fromTo(".dash-table-wrap", { y: 20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
          .fromTo("tbody tr", { x: -20, opacity: 1 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }, "-=0.2");
    }, { scope: container });

    const dummyAppointment = [
        ...appointments.map(a => ({ id: "d" + a.id, type: "doctor", status: (a.status || "upcoming").toLowerCase(), date: a.date, time: a.time, subjectName: a.doctor, fee: a.payment === "Online" ? "Paid" : "Cash" })),
        ...bookedServices.map(a => ({ id: "s" + a.id, type: "service", status: (a.status || "upcoming").toLowerCase(), date: a.date, time: a.time, subjectName: a.name, fee: a.price }))
    ].slice(0, 5); // Just show top 5 on dashboard

    const stats = [
        { label: "Total Patients", value: "1,240", icon: <FaUsers />, color: "#3b82f6" },
        { label: "Appointments", value: "320", icon: <FaCalendarCheck />, color: "#10b981" },
        { label: "Total Revenue", value: "₹4.5L", icon: <FaWallet />, color: "#8b5cf6" },
        { label: "Growth", value: "+12%", icon: <FaChartLine />, color: "#f59e0b" },
    ];

    return (
        <div className="doc-dashboard" ref={container}>
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

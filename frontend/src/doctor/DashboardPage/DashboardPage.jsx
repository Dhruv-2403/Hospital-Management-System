import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Calendar,
    CheckCircle,
    XCircle,
    Users,
    Phone,
    BadgeIndianRupee,
} from "lucide-react";
import "./DashboardPage.css";

const API_BASE = "http://localhost:4000";


function parseDateTime(date, time) {
    return new Date(`${date}T${time}:00`);
}

function formatTimeAMPM(time24) {
    if (!time24) return "";
    const [hh, mm] = time24.split(":");
    let h = parseInt(hh, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${mm} ${ampm}`;
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(`${dateStr}T00:00:00`);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function backendToFrontendStatus(s) {
    if (!s) return "pending";
    const v = String(s).toLowerCase();
    if (v === "pending") return "pending";
    if (v === "confirmed") return "confirmed";
    if (v === "completed") return "complete";
    if (v === "canceled" || v === "cancelled") return "cancelled";
    if (v === "rescheduled") return "rescheduled";
    return v;
}

function frontendToBackendStatus(fs) {
    if (!fs) return "Pending";
    const v = String(fs).toLowerCase();
    if (v === "pending") return "Pending";
    if (v === "confirmed") return "Confirmed";
    if (v === "complete") return "Completed";
    if (v === "cancelled") return "Canceled";
    if (v === "rescheduled") return "Rescheduled";
    return fs;
}

function to24Hour(timeStr) {
    if (!timeStr) return "00:00";
    const m = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (!m) return timeStr;
    let hh = Number(m[1]);
    const mm = m[2];
    const ampm = m[3];
    if (!ampm) return `${String(hh).padStart(2, "0")}:${mm}`;
    const up = ampm.toUpperCase();
    if (up === "AM" && hh === 12) hh = 0;
    if (up === "PM" && hh !== 12) hh += 12;
    return `${String(hh).padStart(2, "0")}:${mm}`;
}

function to12HourFrom24(hhmm) {
    if (!hhmm) return "12:00 AM";
    const [hh, mm] = hhmm.split(":").map(Number);
    const ampm = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

function normalizeAppointment(a) {
    if (!a) return null;
    const id = a._id || a.id || String(Math.random()).slice(2);
    const patient = a.patientName || a.patient || a.name || "Unknown";
    const age = a.age ?? a.patientAge ?? "";
    const gender = a.gender || "";
    const doctorName =
        (a.doctorId && typeof a.doctorId === "object" && a.doctorId.name) ||
        a.doctorName || a.doctor || "Doctor";
    const doctorImage =
        (a.doctorId && typeof a.doctorId === "object" && a.doctorId.imageUrl) ||
        a.doctorImage || a.doctorImageUrl || "";
    const speciality =
        (a.doctorId && (a.doctorId.specialization || a.doctorId.speciality)) ||
        a.speciality || a.specialization || "";
    const mobile = a.mobile || a.phone || "";
    const fee = Number(a.fees ?? a.fee ?? a.payment?.amount ?? 0) || 0;
    const date = a.date || (a.slot && a.slot.date) || "";
    const rawTime =
        a.time || (a.slot && a.slot.time) ||
        (a.hour != null && a.minute != null
            ? `${String(a.hour).padStart(2, "0")}:${String(a.minute).padStart(2, "0")}`
            : "");
    const time24 = to24Hour(rawTime);
    const status = backendToFrontendStatus(
        a.status || (a.payment && a.payment.status) || "Pending",
    );
    return { id, patient, age, gender, doctorName, doctorImage, speciality, mobile, date, time: time24, fee, status, raw: a };
}

export default function DashboardPage({ apiBase }) {
    const params = useParams();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = apiBase || API_BASE;
    const doctorId = params.id;

    async function fetchAppointments() {
        setLoading(true);
        setError(null);
        try {
            const url = `${API}/api/appointments/doctor/${encodeURIComponent(doctorId)}`;
            const res = await fetch(url);
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.message || `Failed to fetch appointments (${res.status})`);
            }
            const body = await res.json();
            const list = Array.isArray(body.appointments)
                ? body.appointments
                : Array.isArray(body) ? body : (body.items ?? body.data ?? []);
            setAppointments((Array.isArray(list) ? list : []).map(normalizeAppointment).filter(Boolean));
        } catch (err) {
            console.error("fetchAppointments:", err);
            setError(err.message || "Failed to load appointments");
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();

    }, [API, doctorId]);

    const sorted = useMemo(
        () => [...appointments].sort((a, b) => parseDateTime(b.date, b.time) - parseDateTime(a.date, a.time)),
        [appointments],
    );
    const top12 = sorted.slice(0, 12);

    const totalAppointments = appointments.length;
    const completedAppointments = appointments.filter((a) => a.status === "complete").length;
    const cancelledAppointments = appointments.filter((a) => a.status === "cancelled").length;
    const totalEarnings = appointments.filter((a) => a.status === "complete").reduce((s, a) => s + (Number(a.fee) || 0), 0);

    async function updateStatusRemote(id, newStatusFrontend) {
        const appt = appointments.find((p) => p.id === id);
        if (!appt || appt.status === "complete" || appt.status === "cancelled") return;
        const backendStatus = frontendToBackendStatus(newStatusFrontend);
        setAppointments((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatusFrontend } : p)));
        try {
            const res = await fetch(`${API}/api/appointments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: backendStatus }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.message || `Status update failed (${res.status})`);
            }
            const data = await res.json();
            const updated = data.appointment || data;
            setAppointments((prev) =>
                prev.map((p) => {
                    if (p.id !== id) return p;
                    const mergedRaw = { ...(p.raw || {}), ...(updated || {}) };
                    return normalizeAppointment(mergedRaw) || { ...p, status: backendToFrontendStatus(updated.status || backendStatus), raw: mergedRaw };
                }),
            );
        } catch (err) {
            console.error("updateStatusRemote:", err);
            setAppointments((prev) => prev.map((p) => (p.id === id ? { ...p, status: appt.status } : p)));
            setError(err.message || "Failed to update status");
        }
    }

    async function rescheduleRemote(id, newDate, newTime24) {
        const appt = appointments.find((p) => p.id === id);
        if (!appt || appt.status === "complete" || appt.status === "cancelled") return;
        const time12 = to12HourFrom24(newTime24);
        setAppointments((prev) =>
            prev.map((p) => (p.id === id ? { ...p, date: newDate, time: newTime24, status: "rescheduled" } : p)),
        );
        try {
            const res = await fetch(`${API}/api/appointments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: newDate, time: time12 }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.message || `Reschedule failed (${res.status})`);
            }
            const data = await res.json();
            const updated = data.appointment || data;
            setAppointments((prev) =>
                prev.map((p) => {
                    if (p.id !== id) return p;
                    const mergedRaw = { ...(p.raw || {}), ...(updated || {}) };
                    return normalizeAppointment(mergedRaw) || { ...p, date: newDate, time: newTime24, status: backendToFrontendStatus(updated.status || "Rescheduled"), raw: mergedRaw };
                }),
            );
        } catch (err) {
            console.error("rescheduleRemote:", err);
            setError(err.message || "Failed to reschedule");
            await fetchAppointments();
        }
    }

    const doctorNameFromData = appointments[0]?.raw?.doctorId?.name || appointments[0]?.raw?.doctorName || null;

    return (
        <div className="db-page-container">
            <div className="db-content-wrapper">
                {/* Header */}
                <div className="db-header-container">
                    <div>
                        <h1 className="db-header-title">
                            {doctorNameFromData ? `${doctorNameFromData} — Dashboard` : "Doctor Dashboard"}
                        </h1>
                        <p className="db-header-subtitle">
                            {doctorId ? `Appointments for doctor ${doctorId}` : "Overview of latest appointments & earnings"}
                        </p>
                    </div>
                    <div className="db-flex-gap-3">
                        <span className="db-header-info">{loading ? "Loading..." : `${appointments.length} total`}</span>
                        <button onClick={fetchAppointments} className="db-refresh-button">Refresh</button>
                    </div>
                </div>

                {/* Stat cards */}
                <div className="db-stats-grid">
                    <StatCard title="Total Appointments" value={totalAppointments} icon={<Calendar className="w-5 h-5" />} accent="emerald" />
                    <StatCard title="Total Earnings" value={`₹ ${totalEarnings}`} icon={<BadgeIndianRupee className="w-5 h-5" />} accent="amber" />
                    <StatCard title="Completed" value={completedAppointments} icon={<CheckCircle className="w-5 h-5" />} accent="emerald-light" />
                    <StatCard title="Cancelled" value={cancelledAppointments} icon={<XCircle className="w-5 h-5" />} accent="rose" />
                </div>

                {/* Appointments section */}
                <div className="db-appointments-container">
                    <div className="db-appointments-header">
                        <h2 className="db-appointments-title">Latest Appointments</h2>
                        <div className="db-appointments-total">
                            <Users className="db-total-icon" />
                            <span>{totalAppointments} total</span>
                        </div>
                    </div>

                    <div className="db-cards-grid">
                        {top12.map((a) => (
                            <div key={a.id} className="db-appointment-card">
                                <div className="db-card-header">
                                    <div className="db-card-avatar">
                                        {a.doctorImage ? (
                                            <img
                                                src={a.doctorImage}
                                                alt={a.doctorName}
                                                onError={(e) => (e.currentTarget.style.display = "none")}
                                                className="db-card-avatar-image"
                                            />
                                        ) : (
                                            <div className="db-card-avatar-fallback">{(a.doctorName || "D").charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="db-card-content">
                                        <div className="db-card-patient-name">{a.patient}</div>
                                        <div className="db-card-patient-info">{a.age} yrs · {a.gender}</div>
                                        <div className="db-card-doctor-info">
                                            <span className="db-card-doctor-name">{a.doctorName}</span>
                                        </div>
                                        <div className="db-card-speciality">{a.speciality}</div>
                                        <div className="db-card-phone-container">
                                            <Phone className="db-card-phone-icon" />
                                            <span>{a.mobile}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="db-date-time-container">
                                    <div className="db-date-text">{formatDate(a.date)}</div>
                                    <div className="db-time-text">{formatTimeAMPM(a.time)}</div>
                                </div>

                                <div className="db-card-footer">
                                    <div className="db-fee-text">₹{a.fee}</div>
                                    <div className="db-status-container">
                                        <StatusBadge status={a.status} />
                                        <StatusSelect appointment={a} onChange={(s) => updateStatusRemote(a.id, s)} />
                                    </div>
                                    <div className="db-mt-2-w-full">
                                        <RescheduleButton
                                            appointment={a}
                                            onReschedule={(newDate, newTime) => rescheduleRemote(a.id, newDate, newTime)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="db-show-more-container">
                        <Link
                            to={doctorId ? `/doctor-admin/${doctorId}/appointments` : "/appointments"}
                            className="db-show-more-button"
                        >
                            Show more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, accent = "emerald" }) {
    return (
        <div className="db-stat-card">
            <div className="db-stat-content">
                <div className="db-stat-text-container">
                    <div className="db-stat-title">{title}</div>
                    <div className="db-stat-value">{value}</div>
                </div>
                <div className={`db-stat-icon-container db-accent-${accent}`}>
                    <div className="db-stat-icon">{icon}</div>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const variantMap = {
        complete: "db-badge-complete",
        cancelled: "db-badge-cancelled",
        confirmed: "db-badge-confirmed",
        rescheduled: "db-badge-rescheduled",
    };
    const label = {
        complete: "Completed",
        cancelled: "Cancelled",
        confirmed: "Confirmed",
        rescheduled: "Rescheduled",
        pending: "Pending",
    };
    return (
        <span className={`db-status-badge-base ${variantMap[status] || "db-badge-pending"}`}>
            {label[status] || "Pending"}
        </span>
    );
}


function StatusSelect({ appointment, onChange }) {
    const terminal = appointment.status === "complete" || appointment.status === "cancelled";
    const selectClass = `db-status-select ${terminal ? "db-status-select-disabled" : "db-status-select-enabled"}`;

    if (appointment.status === "rescheduled") {
        return (
            <select
                value={appointment.status}
                onChange={(e) => onChange(e.target.value)}
                className={selectClass}
                title="Only Completed or Cancelled allowed after reschedule"
            >
                <option value="rescheduled" disabled>Rescheduled</option>
                <option value="complete">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
        );
    }

    return (
        <select
            value={appointment.status}
            onChange={(e) => onChange(e.target.value)}
            disabled={terminal}
            className={selectClass}
            title={terminal ? "Status cannot be changed" : "Change status"}
        >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="complete">Completed</option>
            <option value="cancelled">Cancelled</option>
        </select>
    );
}


function RescheduleButton({ appointment, onReschedule }) {
    const terminal = appointment.status === "complete" || appointment.status === "cancelled";
    const [editing, setEditing] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("09:00");

    const minDate = React.useMemo(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }, []);

    React.useEffect(() => {
        const apptDate = (appointment.date ? String(appointment.date) : "").slice(0, 10);
        setDate(apptDate && apptDate >= minDate ? apptDate : minDate);
        setTime(appointment.time || "09:00");
    }, [appointment.date, appointment.time, minDate]);

    function save() {
        if (!date || !time || date < minDate) { setDate(minDate); return; }
        onReschedule(date, time);
        setEditing(false);
    }

    function cancel() {
        const apptDate = (appointment.date ? String(appointment.date) : "").slice(0, 10);
        setDate(apptDate && apptDate >= minDate ? apptDate : minDate);
        setTime(appointment.time || "09:00");
        setEditing(false);
    }

    if (!editing) {
        return (
            <div className="db-justify-end">
                <button
                    onClick={() => setEditing(true)}
                    disabled={terminal}
                    title={terminal ? "Cannot reschedule completed/cancelled" : "Reschedule"}
                    className={`db-reschedule-btn ${terminal ? "db-reschedule-btn-disabled" : "db-reschedule-btn-enabled"}`}
                >
                    Reschedule
                </button>
            </div>
        );
    }

    return (
        <div className="db-reschedule-form">
            <input type="date" value={date} min={minDate} onChange={(e) => setDate(e.target.value)} className="db-reschedule-date-input" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="db-reschedule-time-input" />
            <div className="db-reschedule-buttons">
                <button onClick={save} className="db-save-button">Save</button>
                <button onClick={cancel} className="db-cancel-button">Cancel</button>
            </div>
        </div>
    );
}

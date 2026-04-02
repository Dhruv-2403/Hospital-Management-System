import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock, FaGraduationCap, FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { doctors } from "../../data/doctorsData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./DoctorDetail.css";

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = doctors.find((d) => String(d.id) === id);
  const container = useRef();

  useGSAP(() => {
    if(!doctor) return;
    const tl = gsap.timeline();
    tl.fromTo(".back-link", { x: -20, opacity: 1 }, { x: 0, opacity: 1, duration: 0.3 })
      .fromTo(".dd-image-section", { scale: 0.9, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }, "-=0.1")
      .fromTo(".dd-info > *", { x: 30, opacity: 1 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.4")
      .fromTo(".dd-schedule", { y: 40, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
  }, { scope: container, dependencies: [doctor] });

  if (!doctor) {
    return (
      <div className="page-pad" style={{ textAlign: "center", paddingTop: 140 }}>
        <h2>Doctor not found</h2>
        <Link to="/doctors" className="btn btn-primary" style={{ marginTop: 20 }}>Back to Doctors</Link>
      </div>
    );
  }

  const scheduleEntries = Object.entries(doctor.schedule || {});

  return (
    <div className="doctor-detail page-pad" ref={container}>
      <Link to="/doctors" className="back-link"><FaArrowLeft /> Back to Doctors</Link>

      <div className="dd-grid">
        {/* Left: Image */}
        <div className="dd-image-section">
          <img src={doctor.image} alt={doctor.name} className="dd-image" />
        </div>

        {/* Right: Info */}
        <div className="dd-info">
          <div className="dd-status">
            <span className={`avail-badge ${doctor.available ? "avail" : "unavail"}`}>
              {doctor.available ? "Available" : "Unavailable"}
            </span>
          </div>
          <h1 className="dd-name">{doctor.name}</h1>
          <p className="dd-spec">{doctor.specialization}</p>

          <div className="dd-stats-row">
            <div className="dd-stat">
              <FaStar className="star" /> <strong>{doctor.rating}</strong> Rating
            </div>
            <div className="dd-stat">
              <FaClock /> <strong>{doctor.experience}</strong> Exp
            </div>
            <div className="dd-stat">
              <strong>{doctor.patients}</strong> Patients
            </div>
          </div>

          <div className="dd-details">
            <div className="dd-row"><FaGraduationCap /><span>{doctor.qualifications}</span></div>
            <div className="dd-row"><FaMapMarkerAlt /><span>{doctor.location}</span></div>
          </div>

          <div className="dd-about">
            <h3>About</h3>
            <p>{doctor.about}</p>
          </div>

          <div className="dd-fee-row">
            <span className="dd-fee-label">Consultation Fee</span>
            <span className="dd-fee-value">₹{doctor.fee}</span>
          </div>

          <div className="dd-success">
            <span>Success Rate: <strong>{doctor.success}</strong></span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      {scheduleEntries.length > 0 && (
        <div className="dd-schedule">
          <h2><FaCalendarAlt /> Available Slots</h2>
          <div className="schedule-grid">
            {scheduleEntries.map(([date, slots]) => (
              <div key={date} className="schedule-day">
                <h4>{date}</h4>
                <div className="slot-chips">
                  {slots.map((s) => (
                    <span key={s} className="slot-chip">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

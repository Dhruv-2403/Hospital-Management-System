import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import "./Banner.css";

const STATS = [
    { value: "20+", label: "Specialist Doctors" },
    { value: "10k+", label: "Happy Patients" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Success Rate" },
];

export default function Banner() {
    return (
        <section className="banner">
            <div className="banner-inner">
                <div className="banner-content">
                    <span className="banner-badge">🏥 Trusted Healthcare</span>
                    <h1>
                        Your Health, <br />
                        <span className="gradient-text">Our Priority</span>
                    </h1>
                    <p>
                        Expert doctors. Modern facilities. Compassionate care.
                        Book your appointment online in seconds.
                    </p>
                    <ul className="banner-checks">
                        {["Verified Specialists", "Online Appointments", "Secure Payments"].map((t) => (
                            <li key={t}><FaCheckCircle className="check-icon" /> {t}</li>
                        ))}
                    </ul>
                    <div className="banner-cta">
                        <Link to="/doctors" className="btn btn-primary">
                            Find a Doctor <FaArrowRight />
                        </Link>
                        <Link to="/services" className="btn btn-outline">
                            Our Services
                        </Link>
                    </div>
                </div>

                <div className="banner-illustration">
                    <div className="banner-circle" />
                    <div className="banner-card">
                        <div className="bcard-header">
                            <span className="bcard-dot green" />
                            <span>Next Available</span>
                        </div>
                        <p className="bcard-name">Dr. Sarah Johnson</p>
                        <p className="bcard-spec">Cardiologist • Today 10:00 AM</p>
                        <Link to="/doctors/1" className="btn btn-primary btn-sm" style={{ marginTop: "10px" }}>
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>

            <div className="banner-stats">
                {STATS.map((s) => (
                    <div key={s.label} className="stat-item">
                        <span className="stat-value">{s.value}</span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

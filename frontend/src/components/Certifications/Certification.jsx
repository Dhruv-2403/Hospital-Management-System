import { FaUserMd, FaAmbulance, FaFlask, FaClock, FaShieldAlt, FaHeartbeat } from "react-icons/fa";
import "./Certification.css";

const FEATURES = [
    { icon: <FaUserMd />, title: "Expert Doctors", desc: "Board-certified specialists with 10+ years of experience in their fields." },
    { icon: <FaAmbulance />, title: "24/7 Emergency", desc: "Round-the-clock emergency services and critical care available always." },
    { icon: <FaFlask />, title: "Modern Labs", desc: "State-of-the-art diagnostic labs with fastest report turnaround time." },
    { icon: <FaClock />, title: "Quick Appointments", desc: "Book your slot in under 2 minutes — online or by phone, anytime." },
    { icon: <FaShieldAlt />, title: "Secure & Private", desc: "Your health records are encrypted and protected with strict privacy." },
    { icon: <FaHeartbeat />, title: "Holistic Care", desc: "Comprehensive treatment plans covering physical and mental wellbeing." },
];

export default function Certifications() {
    return (
        <section className="certifications">
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">Why Us</p>
                    <h2 className="section-title">Why Choose MediCare?</h2>
                    <p className="section-sub">We combine world-class expertise with compassionate care to deliver the best outcomes.</p>
                </div>
                <div className="features-grid">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="feature-card">
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

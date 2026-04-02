import { Link } from "react-router-dom";
import { FaFlask, FaXRay, FaEye, FaHeartbeat, FaTooth, FaCapsules, FaBrain, FaBaby } from "react-icons/fa";
import "./ServicePage.css";

const SERVICES = [
    { id: 1, name: "Blood Tests", icon: <FaFlask />, desc: "Complete blood count, sugar, thyroid, lipid profile and more.", price: 199, color: "#ef4444" },
    { id: 2, name: "X-Ray & Imaging", icon: <FaXRay />, desc: "Digital X-ray, CT scan, MRI, and ultrasound diagnostics.", price: 499, color: "#8b5cf6" },
    { id: 3, name: "Eye Check-up", icon: <FaEye />, desc: "Vision tests, retina exam, cataract screening, and specs check.", price: 399, color: "#06b6d4" },
    { id: 4, name: "Heart Screening", icon: <FaHeartbeat />, desc: "ECG, echocardiogram, stress test, and cardiac risk assessment.", price: 999, color: "#ec4899" },
    { id: 5, name: "Dental Care", icon: <FaTooth />, desc: "Cleaning, fillings, root canal, braces, and whitening.", price: 599, color: "#14b8a6" },
    { id: 6, name: "Pharmacy", icon: <FaCapsules />, desc: "Genuine medicines, OTC products, and home delivery available.", price: 0, color: "#f59e0b" },
    { id: 7, name: "Neurology Tests", icon: <FaBrain />, desc: "EEG, nerve conduction study, and cognitive assessments.", price: 799, color: "#6366f1" },
    { id: 8, name: "Maternity Care", icon: <FaBaby />, desc: "Prenatal checkups, ultrasound, delivery, and postnatal care.", price: 1499, color: "#f43f5e" },
];

export default function ServicePage() {
    return (
        <section className="service-page-section">
            <div className="services-grid">
                {SERVICES.map((s) => (
                    <Link to={`/services/${s.id}`} key={s.id} className="service-card">
                        <div className="service-icon" style={{ background: s.color + "18", color: s.color }}>
                            {s.icon}
                        </div>
                        <h3>{s.name}</h3>
                        <p>{s.desc}</p>
                        <div className="service-footer">
                            <span className="service-price">{s.price > 0 ? `Starting ₹${s.price}` : "Varies"}</span>
                            <span className="service-arrow">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export { SERVICES };

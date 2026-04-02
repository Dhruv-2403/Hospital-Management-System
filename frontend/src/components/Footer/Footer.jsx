import { Link } from "react-router-dom";
import { FaHospital, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <FaHospital /> MediCare
                    </Link>
                    <p>Your trusted partner in healthcare. Quality care for every patient, every day.</p>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/doctors">Doctors</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/appointments">Appointments</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><FaPhone /> +91 98765 43210</li>
                        <li><FaEnvelope /> care@medicare.in</li>
                        <li><FaMapMarkerAlt /> 12, Health Street, Mumbai</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MediCare. All rights reserved.</p>
            </div>
        </footer>
    );
}

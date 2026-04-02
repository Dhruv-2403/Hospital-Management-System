import { Link, useLocation } from "react-router-dom";
import { FaHospital, FaTachometerAlt, FaListUl, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

export default function DoctorNavbar() {
    const { pathname } = useLocation();

    return (
        <nav className="doc-sidebar">
            <div className="doc-brand">
                <FaHospital className="doc-brand-icon" />
                <span>MediCare Pro</span>
            </div>

            <ul className="doc-nav-links">
                <li>
                    <Link to="/doctor/dashboard" className={`doc-nav-link ${pathname === "/doctor/dashboard" ? "active" : ""}`}>
                        <FaTachometerAlt /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/doctor/list" className={`doc-nav-link ${pathname === "/doctor/list" ? "active" : ""}`}>
                        <FaListUl /> Doctors List
                    </Link>
                </li>
                <li>
                    <Link to="/doctor/edit-profile" className={`doc-nav-link ${pathname === "/doctor/edit-profile" ? "active" : ""}`}>
                        <FaUserCircle /> My Profile
                    </Link>
                </li>
            </ul>

            <div className="doc-nav-bottom">
                <button className="doc-nav-link" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </nav>
    );
}

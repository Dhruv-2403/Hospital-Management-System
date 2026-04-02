import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserMd, FaHospital } from "react-icons/fa";
import "./Navbar.css";

const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "Doctors" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-inner">

                <Link to="/" className="navbar-logo">
                    <FaHospital className="logo-icon" />
                    <span>MediCare</span>
                </Link>


                <ul className={`navbar-links ${open ? "open" : ""}`}>
                    {NAV_LINKS.map((l) => (
                        <li key={l.to}>
                            <NavLink
                                to={l.to}
                                end={l.to === "/"}
                                className={({ isActive }) =>
                                    "nav-link" + (isActive ? " active" : "")
                                }
                                onClick={() => setOpen(false)}
                            >
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>


                <div className="navbar-actions">
                    <Link to="/appointments" className="btn btn-outline btn-sm">
                        My Appointments
                    </Link>
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Login
                    </Link>
                </div>


                <button
                    className="hamburger"
                    onClick={() => setOpen((p) => !p)}
                    aria-label="Toggle menu"
                >
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
}

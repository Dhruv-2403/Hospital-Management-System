import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaHeart } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Banner.css";

const STATS = [
    { value: "20+", label: "Specialist Doctors" },
    { value: "10k+", label: "Happy Patients" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Success Rate" },
];

export default function Banner() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(".banner-badge", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5 })
            .fromTo(".banner-content h1", { x: -30, opacity: 1 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.2")
            .fromTo(".banner-content p", { x: -30, opacity: 1 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.2")
            .fromTo(".banner-checks li", { x: -20, opacity: 1 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, "-=0.2")
            .fromTo(".banner-cta", { y: 20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
            .fromTo(".banner-illustration", { scale: 0.8, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5")
            .fromTo(".stat-item", { y: 30, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");

        gsap.to(".float-icon", {
            y: -15,
            rotation: 5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.4
        });
    }, { scope: container });

    return (
        <section className="banner" ref={container}>
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
                    <div className="float-icon fi-1"><FaHeart /></div>
                    <div className="float-icon fi-2"><FaCheckCircle /></div>
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

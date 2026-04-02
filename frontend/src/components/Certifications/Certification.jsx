import { useRef } from "react";
import { FaUserMd, FaAmbulance, FaFlask, FaClock, FaShieldAlt, FaHeartbeat } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Certification.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    { icon: <FaUserMd />, title: "Expert Doctors", desc: "Board-certified specialists with 10+ years of experience in their fields." },
    { icon: <FaAmbulance />, title: "24/7 Emergency", desc: "Round-the-clock emergency services and critical care available always." },
    { icon: <FaFlask />, title: "Modern Labs", desc: "State-of-the-art diagnostic labs with fastest report turnaround time." },
    { icon: <FaClock />, title: "Quick Appointments", desc: "Book your slot in under 2 minutes — online or by phone, anytime." },
    { icon: <FaShieldAlt />, title: "Secure & Private", desc: "Your health records are encrypted and protected with strict privacy." },
    { icon: <FaHeartbeat />, title: "Holistic Care", desc: "Comprehensive treatment plans covering physical and mental wellbeing." },
];

export default function Certifications() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 85%",
            }
        });

        tl.fromTo(".section-header", { y: 30, opacity: 1 }, { y: 0, opacity: 1, duration: 0.6 })
          .fromTo(".feature-card", { y: 30, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");
    }, { scope: container });

    return (
        <section className="certifications" ref={container}>
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

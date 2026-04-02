import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { doctors } from "../../data/doctorsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HomeDoctors.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomeDoctors() {
    const featured = doctors.slice(0, 8);
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            }
        });

        tl.from(".section-header", { y: 30, duration: 0.6 })
            .from(".doc-card", { y: 40, duration: 0.5, stagger: 0.1 }, "-=0.3")
            .from(".home-doctors-cta", { scale: 0.9, duration: 0.4 }, "-=0.2");
    }, { scope: container });

    return (
        <section className="home-doctors" ref={container}>
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">Our Team</p>
                    <h2 className="section-title">Meet Our Specialists</h2>
                    <p className="section-sub">Experienced, caring doctors across every major specialty.</p>
                </div>

                <div className="doctors-grid">
                    {featured.map((doc) => (
                        <Link to={`/doctors/${doc.id}`} key={doc.id} className="doc-card">
                            <div className="doc-img-wrap">
                                <img src={doc.image} alt={doc.name} className="doc-img" />
                                <span className={`avail-badge ${doc.available ? "avail" : "unavail"}`}>
                                    {doc.available ? "Available" : "Busy"}
                                </span>
                            </div>
                            <div className="doc-info">
                                <h3>{doc.name}</h3>
                                <p className="doc-spec">{doc.specialization}</p>
                                <div className="doc-meta">
                                    <span className="doc-rating">
                                        <FaStar className="star" /> {doc.rating}
                                    </span>
                                    <span className="doc-fee">₹{doc.fee}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="home-doctors-cta">
                    <Link to="/doctors" className="btn btn-outline">
                        View All Doctors <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}

import { useRef } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Testimonial.css";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
    { name: "Ananya Sharma", spec: "Cardiology Patient", rating: 5, text: "Dr. Sarah Johnson was absolutely amazing. She explained everything clearly and the booking was seamless." },
    { name: "Rahul Mehta", spec: "Dermatology Patient", rating: 5, text: "MediCare's online booking saved me so much time. Got an appointment within the hour. Highly recommend!" },
    { name: "Priya Singh", spec: "Pediatrics Patient", rating: 5, text: "Excellent experience for my child. Dr. Rodriguez was kind, patient, and very thorough. Will be back." },
    { name: "Vikram Patel", spec: "Orthopedics Patient", rating: 4, text: "Very professional staff. The clinic was clean and modern. Surgery went smoothly. Recovering well!" },
];

export default function Testimonial() {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 85%",
            }
        });

        tl.fromTo(".section-header", { y: 30, opacity: 1 }, { y: 0, opacity: 1, duration: 0.6 })
          .fromTo(".review-card", { scale: 0.9, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.3");
    }, { scope: container });

    return (
        <section className="testimonials" ref={container}>
            <div className="container">
                <div className="section-header">
                    <p className="section-eyebrow">Stories</p>
                    <h2 className="section-title">What Our Patients Say</h2>
                    <p className="section-sub">Thousands of patients trust MediCare for their healthcare needs every month.</p>
                </div>
                <div className="testimonials-grid">
                    {REVIEWS.map((r) => (
                        <div key={r.name} className="review-card">
                            <FaQuoteLeft className="quote-icon" />
                            <p className="review-text">"{r.text}"</p>
                            <div className="review-stars">
                                {Array.from({ length: r.rating }).map((_, i) => (
                                    <FaStar key={i} className="star" />
                                ))}
                            </div>
                            <div className="reviewer">
                                <div className="reviewer-avatar">{r.name.charAt(0)}</div>
                                <div>
                                    <p className="reviewer-name">{r.name}</p>
                                    <p className="reviewer-spec">{r.spec}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { useRef } from "react";
import DoctorsPage from "../../components/DoctorsPage/DoctorsPage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Doctors() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".section-eyebrow, .section-title, .section-sub", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 })
      .fromTo(".doctors-controls", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
      .fromTo(".doc-card", { scale: 0.95, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05 }, "-=0.3");
  }, { scope: container });

  return (
    <div className="doctors-page page-pad" ref={container}>
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-eyebrow">Our Team</p>
        <h1 className="section-title">All Doctors</h1>
        <p className="section-sub">Browse our full team of specialist doctors and book your appointment.</p>
      </div>
      <DoctorsPage />
    </div>
  );
}

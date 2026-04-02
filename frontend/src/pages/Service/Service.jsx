import { useRef } from "react";
import ServicePage from "../../components/ServicePage/ServicePage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Service() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".section-eyebrow, .section-title, .section-sub", 
      { y: -20, opacity: 1 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
    )
    .fromTo(".service-card, .serviceCatalog", { y: 30, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.2");
  }, { scope: container });

  return (
    <div className="page-pad" ref={container}>
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-eyebrow">What We Offer</p>
        <h1 className="section-title">Our Services</h1>
        <p className="section-sub">Browse our comprehensive range of healthcare services and book online.</p>
      </div>
      <ServicePage />
    </div>
  );
}

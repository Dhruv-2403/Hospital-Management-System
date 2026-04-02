import { useRef } from "react";
import ContactsPage from "../../components/ContactsPage/ContactsPage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Contact() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".section-eyebrow, .section-title, .section-sub", { y: -20, opacity: 1 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 })
      .fromTo(".contact-info, .contact-form-card", { scale: 0.95, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.2");
  }, { scope: container });

  return (
    <div className="page-pad" ref={container}>
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-eyebrow">Support</p>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-sub">We're here to help and answer any questions you might have.</p>
      </div>
      <ContactsPage />
    </div>
  );
}

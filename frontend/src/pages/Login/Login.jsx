import { useRef } from "react";
import LoginPage from "../../components/LoginPage/LoginPage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Login() {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(container.current, { scale: 0.95, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" });
  }, { scope: container });

  return (
    <div ref={container} style={{ display: "flex", justifyContent: "center", paddingTop: 140, paddingBottom: 80, background: "var(--gray-50)", minHeight: "calc(100vh - 200px)" }}>
      <LoginPage />
    </div>
  );
}

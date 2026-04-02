import DoctorNavbar from "../../doctor/Navbar/Navbar";
import DashboardPage from "../../doctor/DashboardPage/DashboardPage";

export default function DHome() {
  return (
    <div style={{ display: "flex" }}>
      <DoctorNavbar />
      <div className="doc-layout-content" style={{ flex: 1 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--gray-900)" }}>Dashboard Overview</h1>
          <p style={{ color: "var(--gray-500)" }}>Welcome back, Doctor. Here's what's happening today.</p>
        </div>
        <DashboardPage />
      </div>
    </div>
  );
}

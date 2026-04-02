import DoctorsPage from "../../components/DoctorsPage/DoctorsPage";
import "../../pages/Doctors/Doctors.css"; // Ensure styles load if we had any there

export default function Doctors() {
  return (
    <div className="doctors-page page-pad">
      <div className="section-header" style={{ textAlign: "left" }}>
        <p className="section-eyebrow">Our Team</p>
        <h1 className="section-title">All Doctors</h1>
        <p className="section-sub">Browse our full team of specialist doctors and book your appointment.</p>
      </div>
      <DoctorsPage />
    </div>
  );
}

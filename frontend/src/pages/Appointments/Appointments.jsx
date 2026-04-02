import AppointmentPage from "../../components/AppointmentPage/AppointmentPage";

export default function Appointments() {
  return (
    <div className="page-pad">
      <div className="section-header" style={{ textAlign: "left" }}>
        <h1 className="section-title">My Appointments</h1>
        <p className="section-sub">Manage your doctor consultations and service bookings.</p>
      </div>
      <AppointmentPage />
    </div>
  );
}

import DoctorNavbar from "../../doctor/Navbar/Navbar";
import ListProfilePage from "../../doctor/ListProfilePage/ListProfilePage";

export default function List() {
  return (
    <div style={{ display: "flex" }}>
      <DoctorNavbar />
      <div className="doc-layout-content" style={{ flex: 1 }}>
        <ListProfilePage />
      </div>
    </div>
  );
}

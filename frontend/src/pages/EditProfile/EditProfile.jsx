import EditProfilePage from "../../doctor/EditProfilePage/EditProfilePage";

export default function EditProfile() {
  return (
    <div className="page-pad" style={{ display: "flex", justifyContent: "center", background: "var(--gray-50)", minHeight: "calc(100vh - 200px)" }}>
      <EditProfilePage />
    </div>
  );
}

import LoginPage from "../../components/LoginPage/LoginPage";

export default function Login() {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 140, paddingBottom: 80, background: "var(--gray-50)", minHeight: "calc(100vh - 200px)" }}>
      <LoginPage />
    </div>
  );
}

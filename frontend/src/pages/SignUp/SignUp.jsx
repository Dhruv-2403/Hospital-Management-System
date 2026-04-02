import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

export default function SignUp() {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 140, paddingBottom: 80, background: "var(--gray-50)", minHeight: "calc(100vh - 200px)" }}>
      <ClerkSignUp routing="path" path="/signup" signInUrl="/login" />
    </div>
  );
}

import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="login-page-container">
      <SignIn routing="path" path="/login" signUpUrl="/signup" />
    </div>
  );
}

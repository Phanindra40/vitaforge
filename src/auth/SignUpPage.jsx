// src/auth/SignUpPage.jsx
import { SignUp, useAuth, useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { loaded } = useClerk(); // ✅ Clerk script readiness
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!loaded) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <span className="text-gray-600 animate-pulse">Loading...</span>
    </div>
  );
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
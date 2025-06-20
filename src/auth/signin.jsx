import { SignIn, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Home from "../components/Home";

const SignInPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  // 🔄 Redirect after successful sign-in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Blurred Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Header />
        <Home />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Centered Clerk SignIn */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white/95 backdrop-blur-lg shadow-xl rounded-xl w-full max-w-sm p-4 sm:p-6">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 left-3 text-gray-500 hover:text-black text-xl font-bold"
            aria-label="Close sign-in"
          >
            ×
          </button>

          {/* Clerk SignIn - Added signUpUrl to ensure signup shows */}
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-in" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

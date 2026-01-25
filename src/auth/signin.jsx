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

      {/* Centered Clerk SignIn - Heavily optimized for mobile */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-2 sm:p-4">
        <div className="relative bg-white/95 backdrop-blur-lg shadow-xl rounded-xl w-[95vw] max-w-xs sm:max-w-sm overflow-hidden">
          {/* Close Button - Mobile optimized */}
          <button
            onClick={handleClose}
            className="absolute top-1 right-1 sm:top-3 sm:right-3 text-gray-500 hover:text-black text-xl sm:text-2xl font-bold z-20 p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close sign-in"
          >
            ×
          </button>

          {/* Clerk SignIn with tight mobile constraints */}
          <div className="w-full overflow-y-auto max-h-[95vh] p-2 sm:p-4">
            <div className="scale-[0.85] sm:scale-100 origin-top w-full">
              <SignIn 
                path="/sign-in" 
                routing="path" 
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "w-full bg-transparent shadow-none border-0",
                    headerTitle: "text-base sm:text-2xl font-bold text-gray-900",
                    headerSubtitle: "text-xs sm:text-base text-gray-600 leading-snug",
                    socialButtonsBlockButton: "w-full py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg",
                    formButtonPrimary: "w-full bg-purple-600 hover:bg-purple-700 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg transition",
                    formFieldInput: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-base border rounded-lg",
                    footerActionLink: "text-purple-600 hover:text-purple-700 font-medium text-xs"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

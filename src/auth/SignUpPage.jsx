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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-700 font-medium">Loading authentication...</span>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <SignUp 
          path="/sign-up" 
          routing="path" 
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full shadow-xl border-0 rounded-2xl",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "w-full py-3 text-sm font-medium",
              formButtonPrimary: "w-full bg-purple-600 hover:bg-purple-700 py-3 text-sm font-semibold rounded-lg",
              footerActionLink: "text-purple-600 hover:text-purple-700 font-medium"
            },
            layout: {
              socialButtonsPlacement: "bottom"
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-2 sm:p-4">
      <div className="w-[95vw] max-w-xs sm:max-w-sm mx-auto overflow-hidden">
        <div className="w-full max-h-[95vh] overflow-y-auto">
          <SignUp 
            path="/sign-up" 
            routing="path" 
            signInUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: "w-full scale-[0.85] sm:scale-100 origin-top",
                card: "w-full shadow-2xl border-0 rounded-lg sm:rounded-2xl bg-white/95 backdrop-blur-lg p-3 sm:p-6",
                headerTitle: "text-base sm:text-2xl font-bold text-gray-900",
                headerSubtitle: "text-xs sm:text-sm text-gray-600 leading-snug",
                socialButtonsBlockButton: "w-full py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-50 transition",
                formButtonPrimary: "w-full bg-purple-600 hover:bg-purple-700 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg transition duration-300",
                formFieldInput: "w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-base border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition",
                formFieldLabel: "text-xs sm:text-sm font-medium text-gray-700",
                footerActionLink: "text-purple-600 hover:text-purple-700 font-medium text-xs",
                dividerLine: "bg-gray-200",
                dividerText: "text-xs text-gray-600"
              },
              layout: {
                socialButtonsPlacement: "bottom"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
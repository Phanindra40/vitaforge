// src/auth/signin.jsx
import { SignIn } from "@clerk/clerk-react";
import Header from "../components/Header";
import Home from "../components/Home";

const SignInPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-y-auto">
        <Header />
        <Home />
        {/* Dark overlay with blur */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500" />
      </div>

      {/* Sign-in card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to <span className="text-purple-600">VitaForge</span></h2>
          <SignIn path="/sign-in" routing="path" redirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

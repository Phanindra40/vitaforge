import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Glowing Gradient Background Blobs */}
      <div className="absolute -z-10 top-[-120px] left-[-120px] w-[350px] h-[350px] bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -z-10 bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* Top badge */}
      <div className="mb-4">
        <span className="text-xs bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1 rounded-full font-semibold shadow-md animate-pulse">
          🚀 AI Powered
        </span>
        <span className="ml-2 text-sm text-gray-500">
          Welcome to VitaForge!
        </span>
      </div>

      {/* Main Heading with Typing Effect */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        Build Your Resume <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
          <Typewriter
            words={["With AI", "In Minutes", "For Your Dream Job"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 text-lg max-w-xl mb-10">
        Effortlessly craft job-winning resumes with our intelligent AI resume builder.<br className="hidden sm:inline" />
        Fast, smart & tailored to your dream role.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-7 py-3 rounded-full font-semibold shadow-lg transition duration-300 text-lg"
        >
          Get Started →
        </button>
        <button className="flex items-center gap-2 border border-gray-300 px-7 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow-sm text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.596-2.65A1 1 0 009 9.383v5.233a1 1 0 001.156.986l4.596-2.65a1 1 0 000-1.784z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Watch Video
        </button>
      </div>
    </div>
  );
};

export default Home;

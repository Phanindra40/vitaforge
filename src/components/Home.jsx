import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(isSignedIn ? "/dashboard" : "/sign-in");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-white via-blue-50 to-purple-50">

      {/* Background Blobs */}
      <div className="absolute -z-10 top-[-120px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-purple-400 via-pink-400 to-indigo-400 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -z-10 bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 flex flex-wrap justify-center items-center gap-2"
      >
        <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full font-semibold shadow animate-pulse">
          🚀 AI Powered
        </span>
        <span className="text-sm text-gray-600">
          Welcome to <strong className="text-purple-600">VitaForge</strong>
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
      >
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
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-lg sm:text-xl max-w-2xl mb-10"
      >
        Effortlessly craft job-winning resumes with our intelligent AI builder.
        <br className="hidden sm:block" />
        Fast. Smart. Tailored to your dream role.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          Get Started →
        </button>

        <button
          onClick={handleContact}
          className="bg-white/80 backdrop-blur border border-gray-300 px-8 py-3 rounded-full text-gray-700 font-medium hover:bg-gray-100 hover:shadow transition-all duration-300"
        >
          Contact Us
        </button>

        <button className="flex items-center gap-2 border border-gray-300 bg-white/70 backdrop-blur px-8 py-3 rounded-full font-medium text-gray-700 hover:bg-gray-100 hover:shadow transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-4.596-2.65A1 1 0 009 9.383v5.233a1 1 0 001.156.986l4.596-2.65a1 1 0 000-1.784z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Watch Video
        </button>
      </motion.div>
    </div>
  );
};

export default Home;

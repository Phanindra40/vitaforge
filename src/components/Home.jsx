import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import demoVideo from "../assets/vitaforge-demo.mp4.mp4";

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
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 text-center">

      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src={demoVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/50 -z-10" />

      {/* Floating Glow Orbs */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse -z-10"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 animate-bounce -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-ping -z-10"></div>

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
        <span className="text-sm text-gray-200">
          Welcome to <strong className="text-purple-400">VitaForge</strong>
        </span>
      </motion.div>

      {/* Heading with Shiny Effect */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6"
      >
        Build Your Resume <br />
        <span
          style={{
            background: "linear-gradient(90deg, #a78bfa, #60a5fa, #f472b6, #a78bfa)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shine 6s linear infinite"
          }}
        >
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

      {/* Inline Keyframes for Shine */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-200 text-lg sm:text-xl max-w-2xl mb-10"
      >
        Effortlessly craft job-winning resumes with our intelligent AI builder.
        <br className="hidden sm:block" />
        Fast. Smart. Tailored to your dream role.
      </motion.p>

      {/* CTA Buttons (Glassmorphic) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20"
      >
        <button
          onClick={handleGetStarted}
          className="hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
        >
          Get Started →
        </button>

        <button
          onClick={handleContact}
          className="hover:scale-105 transition-transform duration-300 bg-white/20 backdrop-blur border border-white/30 px-8 py-3 rounded-full text-white font-medium"
        >
          Contact Us
        </button>

        <button className="hover:scale-105 transition-transform duration-300 flex items-center gap-2 border border-white/30 bg-white/20 backdrop-blur px-8 py-3 rounded-full font-medium text-white">
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

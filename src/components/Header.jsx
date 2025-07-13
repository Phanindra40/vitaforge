import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import logo from "../assets/header.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Typewriter effect for VitaForge.ai
  const [typedText, setTypedText] = useState("");
  const fullText = "VitaForge.ai";
  const typingSpeed = 120;
  const pauseDuration = 1000;
  const repeatCount = 2;

  useEffect(() => {
    let index = 0;
    let loopCount = 0;
    let typing = true;

    const interval = setInterval(() => {
      if (typing) {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          typing = false;
          setTimeout(() => {
            if (loopCount < repeatCount - 1) {
              index = 0;
              setTypedText("");
              typing = true;
              loopCount++;
            } else {
              clearInterval(interval);
            }
          }, pauseDuration);
        }
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => navigate("/sign-in");

  return (
    <header className="bg-gradient-to-r from-white via-purple-50 to-blue-100 sticky top-0 z-50 shadow-md backdrop-blur-lg w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Typing Name */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={logo}
                alt="VitaForge Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-purple-400 shadow"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-400 animate-ping"></span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide flex items-center font-mono truncate bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
                {typedText}
                <span className="ml-1 w-1 h-6 bg-purple-400 animate-blink rounded-sm"></span>
              </h1>
              <p className="text-xs text-purple-500 italic mt-1 truncate">AI Resume Builder</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            <Link to="/features" className="text-purple-700 hover:text-indigo-700 font-medium transition">Features</Link>
            {isSignedIn && (
              <Link to="/dashboard" className="text-purple-700 hover:text-indigo-700 font-medium transition">Dashboard</Link>
            )}
            <Link to="/contact" className="text-purple-700 hover:text-indigo-700 font-medium transition">Contact</Link>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 sm:px-5 py-2 rounded-full font-bold shadow hover:from-purple-600 hover:to-indigo-700 transition"
              >
                Get Started 🚀
              </button>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex-shrink-0">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-purple-900">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 space-y-3 pb-5 text-center">
            <Link to="/features" className="block text-purple-700 hover:text-indigo-700 font-medium">Features</Link>
            {isSignedIn && (
              <Link to="/dashboard" className="block text-purple-700 hover:text-indigo-700 font-medium">Dashboard</Link>
            )}
            <Link to="/contact" className="block text-purple-700 hover:text-indigo-700 font-medium">Contact</Link>
            {isSignedIn ? (
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <button
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-full font-semibold hover:from-purple-600 hover:to-indigo-700 transition shadow"
              >
                Get Started 🚀
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

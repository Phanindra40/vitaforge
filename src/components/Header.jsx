import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import logo from "../assets/header.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/sign-in");
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={logo}
                alt="VitaForge Logo"
                className="h-12 w-12 rounded-full shadow-lg border-2 border-purple-500"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-500 animate-ping"></span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">VitaForge</h1>
              <p className="text-sm text-gray-500 italic -mt-1">AI Resume Builder</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/features" className="text-gray-700 hover:text-indigo-600 font-medium">Features</Link>
            {isSignedIn && (
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium">Dashboard</Link>
            )}
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-5 py-2 rounded-full font-bold shadow hover:from-indigo-600 hover:to-fuchsia-600 transition"
              >
                Get Started🚀
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 space-y-3 pb-5">
            <Link to="/features" className="block text-gray-700 hover:text-indigo-600 font-medium">Features</Link>
            {isSignedIn && (
              <Link to="/dashboard" className="block text-gray-700 hover:text-indigo-600 font-medium">Dashboard</Link>
            )}
            <Link to="/contact" className="block text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>
            {isSignedIn ? (
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <button
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white py-2 rounded-full font-semibold hover:from-indigo-600 hover:to-fuchsia-600 transition shadow"
              >
                Get Started🚀
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

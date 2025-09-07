import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/header.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Typing Effect
  const [typedText, setTypedText] = useState("");
  const fullText = "VitaForge";
  const typingSpeed = 120;
  const pauseDuration = 1000;
  const repeatCount = 2;

  useEffect(() => {
    let index = 0,
      loopCount = 0,
      typing = true;
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
            } else clearInterval(interval);
          }, pauseDuration);
        }
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => navigate("/sign-in");

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Navigation Bar */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between bg-white/70 border border-purple-200 rounded-full shadow-xl backdrop-blur px-6 py-3 space-y-4 md:space-y-0 md:space-x-6"
        >
          {/* Logo + Typing Text */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="VitaForge Logo"
              className="h-10 w-10 rounded-full border-2 border-purple-500 shadow-md"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">
                {typedText}
                <span className="ml-1 w-[2px] h-5 bg-purple-500 inline-block animate-blink" />
              </h1>
              <p className="text-xs text-purple-500 italic">AI Resume Builder</p>
            </div>
          </div>

          {/* CTA + Nav Links */}
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              {isSignedIn && (
                <motion.div
                  key="dashboard-link"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block"
                >
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Link
                to="/features"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition"
              >
                Features
              </Link>
            </motion.div>

            {isSignedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <UserButton afterSignOutUrl="/" />
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-1.5 text-sm rounded-full font-semibold hover:from-purple-600 hover:to-indigo-700 transition shadow"
              >
                Get Started 🚀
              </motion.button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-purple-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-white border border-purple-200 rounded-xl shadow-md p-4 space-y-3 text-center md:hidden overflow-hidden"
            >
              <Link
                to="/features"
                className="block text-purple-700 font-medium hover:text-indigo-700"
              >
                Features
              </Link>

              <AnimatePresence>
                {isSignedIn && (
                  <motion.div
                    key="mobile-dashboard-link"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      to="/dashboard"
                      className="block text-purple-700 font-medium hover:text-indigo-700"
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSignedIn && (
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-full font-semibold hover:from-purple-600 hover:to-indigo-700 transition shadow"
                >
                  Get Started 🚀
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

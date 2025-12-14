import React from "react";
import { motion as _motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-black/80 backdrop-blur-xl border-t border-white/10 text-gray-300">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 - Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-extrabold text-white">VitaForge</h2>
          <p className="mt-3 text-sm text-gray-400 max-w-sm">
            Build ATS-friendly, AI-powered resumes in minutes. Tailored to your
            dream job, beautifully designed, and recruiter-approved.
          </p>
        </motion.div>

        {/* Column 2 - Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/templates"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Column 3 - Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <div className="flex gap-5 text-xl">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-100 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:info@vitaforge.com"
              className="hover:text-red-400 transition-colors"
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-8 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} VitaForge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

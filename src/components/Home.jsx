import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion as _motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import sampleResume from "../assets/sample resume.png";
import homeimage from "../assets/newhome.png";

// ===== HERO BADGE =====
const HeroBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15 }}
    className="mb-4 flex flex-wrap gap-2 items-center justify-center md:justify-start"
  >
    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 text-xs rounded-full font-semibold shadow animate-pulse">
      🚀 AI Powered
    </span>
    <span className="text-sm text-gray-700">
      Welcome to <strong className="text-purple-600">VitaForge</strong>
    </span>
  </motion.div>
);

// ===== HERO HEADING =====
const HeroHeading = () => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25 }}
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
  >
    Build Your Resume <br />
    <span className="animate-shine bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
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
);

const shineKeyframes = `
  @keyframes shine {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .animate-shine {
    background-size: 200% auto;
    animation: shine 5s linear infinite;
  }
`;

// ===== CTA BUTTON =====
const CtaButton = ({ onBuildResume }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="flex items-center justify-center md:justify-start mt-6"
  >
    <button
      onClick={onBuildResume}
      className="relative group hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg shadow-purple-300/30 transition-transform duration-300"
    >
      Build My Resume →
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition" />
    </button>
  </motion.div>
);

// ===== HOME COMPONENT =====
const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const handleBuildResume = () =>
    navigate(isSignedIn ? "/dashboard" : "/sign-in");

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col bg-gray-50">
      {/* Glow Orbs */}
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-30 -z-10"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10"
      />

      {/* HERO SECTION */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <HeroBadge />
            <HeroHeading />
            <style>{shineKeyframes}</style>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 text-lg sm:text-xl max-w-2xl mb-10"
            >
              Effortlessly craft job-winning resumes with our intelligent AI builder.
              <br className="hidden sm:block" />
              Fast. Smart. Tailored to your dream role.
            </motion.p>
            <CtaButton onBuildResume={handleBuildResume} />
          </div>

          {/* Right Content */}
          <div className="flex-1 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-full max-w-md"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-50 -z-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-50 -z-10" />
              <img
                src={homeimage}
                alt="Hero Preview"
                className="rounded-xl shadow-2xl border border-white/10 transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-20 border-t border-gray-200 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
          Build Your Resume in 4 Easy Steps
        </h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { step: "1", title: "Enter Your Info", desc: "Fill in your details with ease." },
            { step: "2", title: "Choose Template", desc: "Pick from modern ATS-friendly designs." },
            { step: "3", title: "AI Optimization", desc: "Let AI improve your content instantly." },
            { step: "4", title: "Download", desc: "Export your professional resume in high-quality PDF format." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6 bg-gradient-to-tr from-white/80 to-white/90 rounded-2xl shadow-md text-center hover:scale-105 transition transform border border-gray-200"
            >
              <div className="text-4xl font-extrabold text-purple-500 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SAMPLE RESUME */}
      <section className="py-20 bg-gray-50 flex flex-col md:flex-row items-center gap-12 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            See What You’ll Create
          </h2>
          <p className="text-gray-700 max-w-md mx-auto md:mx-0">
            Preview our sleek and professional templates designed to impress recruiters.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={sampleResume}
            alt="Sample Resume"
            className="rounded-xl shadow-lg max-w-2xl w-full border border-gray-200"
          />
        </motion.div>
      </section>

      {/* TEMPLATES SECTION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            Explore Our Resume Templates
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            Choose from a variety of professionally designed templates to make your resume stand out.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[{
              name: "Modern Professional",
              description: "A sleek and modern design perfect for corporate roles.",
              color: "bg-blue-500",
            }, {
              name: "Creative Designer",
              description: "A vibrant template for creative professionals.",
              color: "bg-purple-500",
            }, {
              name: "Minimalist",
              description: "A clean and simple layout for all industries.",
              color: "bg-green-500",
            }].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 ${template.color} text-white`}
              >
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-sm mb-4">{template.description}</p>
                <button className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">
                  Preview Template
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
            Have Questions About Writing A Great Resume?
          </h2>
          <p className="text-lg text-center text-gray-700 mb-12">
            Expert answers to help you land your dream job.
          </p>
          <div className="space-y-6">
            {[
              { question: "Best resume templates?", answer: "ATS-friendly, clean, and professional templates are ideal." },
              { question: "How to make it stand out?", answer: "Tailor to the job, use action verbs, and quantify achievements." },
              { question: "Include summary?", answer: "Yes, provide a quick overview of qualifications and goals." },
              { question: "Common mistakes?", answer: "Typos, irrelevant info, and poor formatting." },
              { question: "Optimize for ATS?", answer: "Use keywords from the job description and standard headings." },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-white border-t border-gray-200 text-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
        />
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">VitaForge</h2>
            <p className="mt-3 text-sm text-gray-700 max-w-sm">
              Build ATS-friendly, AI-powered resumes in minutes. Tailored to your dream job, beautifully designed, and recruiter-approved.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li className="hover:text-purple-500 cursor-pointer">Home</li>
              <li className="hover:text-purple-500 cursor-pointer">Dashboard</li>
              <li className="hover:text-purple-500 cursor-pointer">Templates</li>
              <li className="hover:text-purple-500 cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex gap-5 text-2xl">
              <FaTwitter className="hover:text-blue-500 cursor-pointer" />
              <FaLinkedin className="hover:text-blue-600 cursor-pointer" />
              <FaGithub className="hover:text-gray-900 cursor-pointer" />
              <FaEnvelope className="hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} VitaForge.Education purpose only.
        </div>
      </footer>
    </div>
  );
};

export default Home;

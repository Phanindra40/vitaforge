import React, { useRef } from "react";
import { motion as _motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, type: "spring" },
  }),
};

const PreviewSection = ({ resumeData, onBack }) => {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto bg-white text-black rounded-2xl shadow-2xl border border-indigo-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-extrabold text-center mb-6 text-indigo-700 tracking-tight drop-shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Resume Preview
      </motion.h2>

      <motion.div
        ref={printRef}
        className="border p-6 rounded-xl shadow bg-white"
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
      >
        {/* Personal Info */}
        <motion.section
          className="mb-6"
          custom={1}
          variants={sectionVariant}
        >
          <h3 className="text-xl font-semibold text-indigo-700 mb-1">
            Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-700">
            <span>
              <strong>Name:</strong> {resumeData.personalInfo?.name ||
                resumeData.personalInfo?.FullName}
            </span>
            <span>
              <strong>Email:</strong> {resumeData.personalInfo?.email ||
                resumeData.personalInfo?.Email}
            </span>
            <span>
              <strong>Phone:</strong> {resumeData.personalInfo?.phone ||
                resumeData.personalInfo?.Phone}
            </span>
          </div>
        </motion.section>

        {/* Summary */}
        {resumeData.summary && (
          <motion.section
            className="mb-6"
            custom={2}
            variants={sectionVariant}
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Summary
            </h3>
            <p className="text-gray-700">{resumeData.summary}</p>
          </motion.section>
        )}

        {/* Experience */}
        {(resumeData.experience?.length > 0 ||
          resumeData.experiences?.length > 0) && (
          <motion.section
            className="mb-6"
            custom={3}
            variants={sectionVariant}
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Experience
            </h3>
            {(resumeData.experience || resumeData.experiences).map((exp, idx) => (
              <motion.div
                key={idx}
                className="mb-3 p-3 rounded bg-indigo-50/60"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="font-semibold">
                  {exp.title || exp.jobTitle}{" "}
                  <span className="text-gray-500 font-normal">
                    {exp.company}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{exp.description}</div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* Projects */}
        {resumeData.projects?.length > 0 && (
          <motion.section className="mb-6" custom={4} variants={sectionVariant}>
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Projects
            </h3>
            {resumeData.projects.map((proj, idx) => (
              <motion.div
                key={idx}
                className="mb-3 p-3 rounded bg-blue-50/60"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="font-semibold">{proj.name}</div>
                <div className="text-sm text-gray-600">{proj.description}</div>
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* Education */}
        {resumeData.education?.length > 0 && (
          <motion.section
            className="mb-6"
            custom={5}
            variants={sectionVariant}
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="mb-3 p-3 rounded bg-purple-50/60"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="font-semibold">{edu.school || edu.institute}</div>
                <div className="text-sm text-gray-600">
                  {edu.degree}{" "}
                  {edu.year && `(${edu.year})`}
                </div>
                {edu.description && (
                  <div className="text-xs text-gray-500">
                    {edu.description}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.section>
        )}

        {/* Skills */}
        {resumeData.skills?.length > 0 && (
          <motion.section className="mb-4" custom={6} variants={sectionVariant}>
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Skills
            </h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {resumeData.skills.map((skill, idx) => (
                <li
                  key={idx}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {typeof skill === "string"
                    ? skill
                    : skill.name || "Skill"}
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </motion.div>

      <motion.div
        className="flex justify-between mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow font-semibold transition"
        >
          ← Back
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-semibold transition"
        >
          Print / Download PDF
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PreviewSection;

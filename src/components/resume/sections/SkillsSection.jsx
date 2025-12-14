import React, { useState, useEffect, useRef } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";

const SkillsSection = ({ data, onChange, onSave, onBack, resumeId, sectionTitle, onSectionTitleChange }) => {
  const [skillsList, setSkillsList] = useState(data || []);
  const [customTitle, setCustomTitle] = useState(sectionTitle || "CORE COMPETENCIES");
  const inputRefs = useRef([]);

  useEffect(() => {
    onChange(skillsList);
  }, [skillsList]);

  useEffect(() => {
    if (onSectionTitleChange) {
      onSectionTitleChange(customTitle);
    }
  }, [customTitle, onSectionTitleChange]);

  const handleChange = (index, value) => {
    const updated = [...skillsList];
    updated[index] = value;
    setSkillsList(updated);
  };

  const handleAdd = () => {
    setSkillsList((prev) => [...prev, ""]);
    setTimeout(() => {
      if (inputRefs.current[skillsList.length]) {
        inputRefs.current[skillsList.length].focus();
      }
    }, 100);
  };

  const handleRemove = (index) => {
    const updated = skillsList.filter((_, i) => i !== index);
    setSkillsList(updated);
  };

  const handleSave = () => {
    if (!resumeId) {
      alert("Resume ID missing. Please restart the form.");
      return;
    }
    if (skillsList.some((skill) => !skill.trim())) {
      alert("Please fill in all skill fields or remove empty ones.");
      return;
    }
    onSave(skillsList);
    alert("✅ Skills saved successfully!");
  };

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 tracking-tight drop-shadow">
        Final Step: <span className="text-blue-700">Your Skills</span>
      </h2>
      <p className="text-center text-gray-500 mb-4">
        List your top skills. These will be highlighted on your resume.
      </p>
      
      {/* Custom Section Title Input */}
      <div className="mb-6 p-4 bg-white/60 rounded-xl border border-blue-200">
        <label className="block text-sm font-semibold text-indigo-700 mb-2">
          📝 Customize Section Title (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g., Technical Skills, Core Competencies, Expertise"
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
          className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        />
        <p className="text-xs text-gray-500 mt-1">
          This will appear as the heading for this section in your resume
        </p>
      </div>

      <AnimatePresence>
        {skillsList.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-400 italic mb-6"
          >
            No skills added yet. Click &quot;+ Add Skill&quot; to begin!
          </motion.div>
        )}
        {skillsList.map((skill, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 mb-4 group"
          >
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              placeholder="Skill (e.g., JavaScript, Leadership)"
              value={skill}
              maxLength={32}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              autoFocus={index === skillsList.length - 1 && skillsList.length > 0}
            />
            <button
              onClick={() => handleRemove(index)}
              className="text-red-600 hover:text-red-800 hover:underline text-xs font-semibold opacity-70 group-hover:opacity-100 transition"
              title="Remove skill"
              aria-label="Remove skill"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
        <button
          onClick={onBack}
          className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-xl font-semibold shadow transition"
        >
          ← Back
        </button>

        <button
          onClick={handleAdd}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow transition"
        >
          + Add Skill
        </button>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-xl font-semibold shadow transition"
        >
          Save & Finish ✅
        </button>
      </div>
    </motion.div>
  );
};

export default SkillsSection;

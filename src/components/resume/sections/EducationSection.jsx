import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EducationSection = ({ data, onChange, onNext, onSave, onBack, resumeId }) => {
  const [educationList, setEducationList] = useState(data || []);

  useEffect(() => {
    onChange(educationList);
  }, [educationList]);

  const handleChange = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      {
        institute: "",
        course: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  const handleNextClick = () => {
    if (!resumeId) {
      alert("Resume ID is missing. Please go back and fill in Personal Info first.");
      return;
    }

    onSave(educationList);
    onNext();
  };

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl rounded-2xl border border-indigo-100 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Education</h2>

      {educationList.map((edu, index) => (
        <motion.div
          key={index}
          className="mb-6 p-5 border border-gray-200 rounded-xl bg-white/80 shadow space-y-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <input
            type="text"
            placeholder="Institute Name"
            value={edu.institute}
            onChange={(e) => handleChange(index, "institute", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Course / Degree"
            value={edu.course}
            onChange={(e) => handleChange(index, "course", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) => handleChange(index, "endDate", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <textarea
            placeholder="Description (optional)"
            value={edu.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            rows={3}
          />
          <button
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:underline text-sm font-semibold"
          >
            Remove
          </button>
        </motion.div>
      ))}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl font-semibold transition"
        >
          Back
        </button>

        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
        >
          + Add Education
        </button>

        <button
          onClick={handleNextClick}
          className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default EducationSection;

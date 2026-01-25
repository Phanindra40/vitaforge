import { useState } from "react";
import { motion } from "framer-motion";
import { FaPenNib, FaRegFileAlt } from "react-icons/fa";
import api from "../../../api/axios"; // ✅ import your axios instance

const SummarySection = ({
  data,
  onUpdate,
  loading: parentLoading,
  onNext,
  onBack,
}) => {
  const [jdMode, setJdMode] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGemini = async (type) => {
    try {
      setLoading(true);

            if (type === "optimize") {
  const res = await api.post(
    "/api/gemini/generate", // ✅ matches backend route
    { prompt: `Optimize this professional summary: ${data}` }
  );
  onUpdate(res.data.text || "");
} 
else if (type === "jd") {
  const res = await api.post(
    "/api/gemini/summary-from-jd", // ✅ matches backend route
    { jobDescription: jobDesc }
  );
  onUpdate(res.data.text || "");
}



    } catch (err) {
      console.error("Gemini API error:", err);
    } finally {
      setLoading(false);
    }
  };


  const handleNext = () => {
    onNext?.();
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-6"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl rounded-2xl border border-purple-100 transition-all duration-300"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 text-center flex items-center gap-2 justify-center">
          <FaPenNib className="text-purple-500" /> Professional Summary
        </h2>

        <textarea
          className="w-full border-2 border-purple-200 focus:border-pink-400 rounded-xl p-3 text-lg shadow-sm transition-all duration-200 resize-none bg-white/80"
          rows="5"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Write a short summary about yourself..."
        />

        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => handleGemini("optimize")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-60"
            disabled={loading || parentLoading}
          >
            <FaPenNib /> {loading ? "Generating..." : "Use AI Writer"}
          </button>

          <button
            type="button"
            onClick={() => setJdMode(!jdMode)}
            className="flex items-center gap-2 text-purple-700 underline font-medium hover:text-pink-600 transition"
          >
            <FaRegFileAlt />
            {jdMode ? "Hide JD Input" : "Use Job Description"}
          </button>
        </div>

        {jdMode && (
          <textarea
            className="w-full mt-4 border-2 border-pink-200 focus:border-purple-400 rounded-xl p-3 text-base shadow-sm transition-all duration-200 resize-none bg-white/80"
            rows="4"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste job description to generate summary..."
          />
        )}

        {jdMode && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => handleGemini("jd")}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:from-green-700 hover:to-teal-600 transition-all duration-200 disabled:opacity-60"
              disabled={loading}
            >
              <FaPenNib /> {loading ? "Generating..." : "Generate from JD"}
            </button>
          </div>
        )}

        <div className="mt-6 flex gap-3 justify-end">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-xl font-semibold shadow hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-7 py-2 rounded-xl font-bold shadow hover:from-purple-700 hover:to-pink-600 transition-all duration-200"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummarySection;

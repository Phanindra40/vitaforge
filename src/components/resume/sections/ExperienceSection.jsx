import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";

const ExperienceSection = ({
  data,
  onUpdate,
  onGeminiSuggest,
  loading,
  onNext,
  onBack,
  sectionTitle,
  onSectionTitleChange,
}) => {
  const [customTitle, setCustomTitle] = useState(sectionTitle || "PROFESSIONAL EXPERIENCE");

  useEffect(() => {
    if (onSectionTitleChange) {
      onSectionTitleChange(customTitle);
    }
  }, [customTitle, onSectionTitleChange]);

  const handleChange = (index, field, value) => {
    const updated = data.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const addExperience = () => {
    const updated = [
      ...data,
      {
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        technologiesUsed: "",
        description: "",
      },
    ];
    onUpdate(updated);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <ErrorBoundary>
      <motion.div
        className="p-6 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl rounded-2xl border border-green-100 max-w-3xl mx-auto transition-all duration-300"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent mb-4 text-center">
          Experience
        </h2>

        {/* Custom Section Title Input */}
        <div className="mb-6 p-4 bg-white/60 rounded-xl border border-green-200">
          <label className="block text-sm font-semibold text-green-700 mb-2">
            📝 Customize Section Title (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Work Experience, Professional Background, Career History"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full px-4 py-2 border border-green-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            This will appear as the heading for this section in your resume
          </p>
        </div>

        {data.map((exp, index) => (
          <motion.div
            key={index}
            className="mb-6 p-4 bg-white/80 rounded-xl shadow border border-gray-200 space-y-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Job Title"
                value={exp.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
              />
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
              />
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
              />
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </div>

            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Technologies Used (comma-separated)"
              value={exp.technologiesUsed}
              onChange={(e) =>
                handleChange(index, "technologiesUsed", e.target.value)
              }
            />

            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Description"
              rows={3}
              value={exp.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />

            <div className="flex flex-wrap gap-3 mt-2 items-center justify-between">
              <button
                onClick={() =>
                  onGeminiSuggest && onGeminiSuggest("experience", index, exp)
                }
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition"
                disabled={loading}
              >
                <Sparkles size={16} />
                {loading ? "Generating..." : "Suggest with AI"}
              </button>
              <button
                onClick={() => removeExperience(index)}
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}

        <div className="mb-6">
          <button
            onClick={addExperience}
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition"
          >
            + Add Experience
          </button>
        </div>

        <div className="flex gap-3 justify-end">
          {onBack && (
            <button
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-7 py-2 rounded-xl font-bold hover:from-green-700 hover:to-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

ExperienceSection.defaultProps = {
  onGeminiSuggest: () => {},
};

export default ExperienceSection;

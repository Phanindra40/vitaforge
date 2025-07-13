import { Sparkles } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";

const ExperienceSection = ({
  data,
  onUpdate,
  onGeminiSuggest,
  loading,
  onNext,
  onBack,
}) => {
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
        jobTitle: "",
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
      <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl rounded-2xl border border-green-100 max-w-2xl mx-auto transition-all duration-300">
        <h2 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent mb-6 text-center">
          Experience
        </h2>
        {data.map((exp, index) => (
          <div
            key={index}
            className="mb-6 p-4 bg-white/80 rounded-xl shadow border border-gray-200 space-y-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="px-4 py-2 border rounded-lg"
                placeholder="Job Title"
                value={exp.jobTitle}
                onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
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
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
            <div className="flex gap-3 mt-2">
              <button
                onClick={() =>
                  onGeminiSuggest && onGeminiSuggest("experience", index, exp)
                }
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition"
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
          </div>
        ))}

        <button
          onClick={addExperience}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-700 transition"
        >
          + Add Experience
        </button>

        <div className="mt-8 flex gap-3 justify-end">
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
      </div>
    </ErrorBoundary>
  );
};

ExperienceSection.defaultProps = {
  onGeminiSuggest: () => {},
};

export default ExperienceSection;

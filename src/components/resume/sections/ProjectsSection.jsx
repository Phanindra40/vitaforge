import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";

const ProjectsSection = ({
  data,
  onUpdate,
  onGeminiSuggest,
  loading,
  onNext,
  onBack,
  sectionTitle,
  onSectionTitleChange,
}) => {
  const [customTitle, setCustomTitle] = useState(sectionTitle || "KEY PROJECTS");

  useEffect(() => {
    if (onSectionTitleChange) {
      onSectionTitleChange(customTitle);
    }
  }, [customTitle, onSectionTitleChange]);

  const handleChange = (index, field, value) => {
    const updated = data.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    onUpdate(updated);
  };

  const addProject = () => {
    const updated = [
      ...data,
      { name: "", description: "", technologies: "", duration: "" },
    ];
    onUpdate(updated);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <ErrorBoundary>
      <motion.div
        className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-2xl rounded-2xl border border-purple-100 max-w-3xl mx-auto transition-all duration-300"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-4 text-center">
          Projects
        </h2>

        {/* Custom Section Title Input */}
        <div className="mb-6 p-4 bg-white/60 rounded-xl border border-purple-200">
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            📝 Customize Section Title (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Personal Projects, Portfolio, Notable Projects"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full px-4 py-2 border border-purple-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            This will appear as the heading for this section in your resume
          </p>
        </div>

        {data.map((project, index) => (
          <motion.div
            key={index}
            className="mb-6 p-4 bg-white/80 rounded-xl shadow border border-gray-200 space-y-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Project Title"
              value={project.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Duration (e.g., Jan 2024 – May 2024)"
              value={project.duration || ""}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Technologies Used (comma-separated)"
              value={project.technologies || ""}
              onChange={(e) =>
                handleChange(index, "technologies", e.target.value)
              }
            />
            <textarea
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Project Description"
              rows={3}
              value={project.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />
            <div className="flex flex-wrap gap-3 mt-2 justify-between items-center">
              <button
                onClick={() =>
                  onGeminiSuggest && onGeminiSuggest("project", index, project)
                }
                className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition"
                disabled={loading}
              >
                <Sparkles size={16} />
                {loading ? "Generating..." : "Suggest with AI"}
              </button>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}

        <div className="mb-6">
          <button
            onClick={addProject}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
          >
            + Add Project
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
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-7 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-600"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

ProjectsSection.defaultProps = {
  onGeminiSuggest: () => {},
};

export default ProjectsSection;

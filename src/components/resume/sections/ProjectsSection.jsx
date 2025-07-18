import { Sparkles } from "lucide-react";
import ErrorBoundary from "../ErrorBoundary";

const ProjectsSection = ({
  data,
  onUpdate,
  onGeminiSuggest,
  loading,
  onNext,
  onBack,
}) => {
  const handleChange = (index, field, value) => {
    const updated = data.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    onUpdate(updated);
  };

  const addProject = () => {
    const updated = [
      ...data,
      { title: "", description: "", technologiesUsed: "", duration: "" },
    ];
    onUpdate(updated);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  return (
    <ErrorBoundary>
      <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-2xl rounded-2xl border border-purple-100 max-w-2xl mx-auto transition-all duration-300">
        <h2 className="text-2xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-6 text-center">
          Projects
        </h2>

        {data.map((project, index) => (
          <div
            key={index}
            className="mb-6 p-4 bg-white/80 rounded-xl shadow border border-gray-200 space-y-2"
          >
            <input
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
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
              value={project.technologiesUsed || ""}
              onChange={(e) =>
                handleChange(index, "technologiesUsed", e.target.value)
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
            <div className="flex gap-3 mt-2">
              <button
                onClick={() =>
                  onGeminiSuggest && onGeminiSuggest("project", index, project)
                }
                className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 transition"
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
          </div>
        ))}

        <button
          onClick={addProject}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
        >
          + Add Project
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
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-7 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

ProjectsSection.defaultProps = {
  onGeminiSuggest: () => {},
};

export default ProjectsSection;

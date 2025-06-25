import { useState } from "react";

const Dashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumes, setResumes] = useState([]);

  const handleCreate = () => {
    if (resumeName.trim()) {
      setResumes([...resumes, resumeName]);
      setResumeName("");
      setShowDialog(false);
    }
  };

  const handleDelete = (indexToDelete) => {
    const updated = resumes.filter((_, index) => index !== indexToDelete);
    setResumes(updated);
  };

  return (
    <div className="p-6 min-h-screen bg-white relative">
      <h1 className="text-3xl font-bold">My Resume</h1>
      <p className="text-gray-600 mb-6">Start Creating AI resume to your next Job role</p>

      {/* Resume cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Plus card */}
        <div
          className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-3xl cursor-pointer hover:bg-gray-200 transition"
          onClick={() => setShowDialog(true)}
        >
          <span className="text-4xl">+</span>
        </div>

        {/* Resume preview cards */}
        {resumes.map((name, index) => (
          <div
            key={index}
            className="w-full h-48 bg-white border rounded-xl shadow-md p-4 flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
            <div className="mt-auto flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Preview
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 transition">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-6 w-80 shadow-2xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Create New Resume</h2>
            <input
              type="text"
              placeholder="Enter resume name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

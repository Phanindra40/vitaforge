import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumes, setResumes] = useState([]);

  const navigate = useNavigate();

  const handleCreate = () => {
    if (resumeName.trim()) {
      localStorage.setItem("resumeName", resumeName);
      setResumeName("");
      setShowDialog(false);
      navigate("/addresume");
    }
  };

  const handleDelete = (indexToDelete) => {
    const updated = resumes.filter((_, index) => index !== indexToDelete);
    setResumes(updated);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 relative">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mb-2">
        My Resumes
      </h1>
      <p className="text-gray-600 mb-8">Start creating an AI resume for your next job role.</p>

      {/* Resume cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {/* Plus card */}
        <div
          className="w-full h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-white rounded-2xl flex items-center justify-center text-4xl cursor-pointer hover:scale-105 hover:shadow-lg transition"
          onClick={() => setShowDialog(true)}
        >
          <span className="text-5xl text-blue-500">+</span>
        </div>

        {/* Resume preview cards */}
        {resumes.map((name, index) => (
          <div
            key={index}
            className="w-full h-48 bg-white border border-blue-100 rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-900 truncate">{name}</h2>
            <div className="mt-auto flex gap-2">
              <button className="px-4 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition">
                Preview
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-full font-semibold shadow hover:bg-red-600 transition"
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
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-7 w-80 shadow-2xl border border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Create New Resume</h2>
            <input
              type="text"
              placeholder="Enter resume name"
              className="w-full p-3 border border-blue-200 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition shadow"
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

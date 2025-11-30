import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import StorageManager from "../utils/storage";
import { NotificationManager } from "../utils/notifications.jsx";
import { CookieManager } from "../utils/cookies";
import NotificationTest from './NotificationTest'; // Added for testing

const Dashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [resumes, setResumes] = useState([]);
  const [storageInfo, setStorageInfo] = useState(StorageManager.getStorageInfo());
  const inputRef = useRef(null);

  const navigate = useNavigate();

  // Load resumes from localStorage
  useEffect(() => {
    const storedResumes = StorageManager.getAllResumes();
    setResumes(storedResumes);
    setStorageInfo(StorageManager.getStorageInfo());

    // Show welcome tip for new users
    if (storedResumes.length === 0 && CookieManager.hasConsent()) {
      setTimeout(() => {
        NotificationManager.tipOfTheDay(
          "Welcome to VitaForge! Click the '+' button to create your first professional resume. Your data is saved locally and never shared."
        );
      }, 1500);
    }
  }, []);

  // Update storage info when resumes change
  useEffect(() => {
    setStorageInfo(StorageManager.getStorageInfo());
  }, [resumes]);

  // Auto-focus input in modal
  useEffect(() => {
    if (showDialog) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showDialog]);

  const handleCreate = () => {
    const name = resumeName.trim();
    if (!name || name.length > 50) {
      NotificationManager.error(
        "Please enter a valid resume name (max 50 characters).",
        { duration: 4000 }
      );
      return;
    }

    // Prevent duplicate names
    if (resumes.some((r) => r.name.toLowerCase() === name.toLowerCase())) {
      NotificationManager.warning(
        "A resume with this name already exists! Please choose a different name.",
        { duration: 4000 }
      );
      return;
    }

    // Check storage limit
    if (!StorageManager.canCreateNewResume()) {
      NotificationManager.storageLimit();
      return;
    }

    const newResume = { 
      id: uuidv4(), 
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Show loading notification
    const loadingToast = NotificationManager.loading("Creating your new resume...");
    
    setTimeout(() => {
      const updatedResumes = [...resumes, newResume];
      setResumes(updatedResumes);

      // Use StorageManager to save data
      StorageManager.saveResumesList(updatedResumes);
      StorageManager.saveResumeData(newResume.id, {
        personalInfo: {},
        summary: "",
        experiences: [],
        education: [],
        projects: [],
        skills: [],
        sectionTitles: {
          summary: "PROFESSIONAL SUMMARY",
          experience: "PROFESSIONAL EXPERIENCE", 
          projects: "KEY PROJECTS",
          education: "EDUCATION",
          skills: "CORE COMPETENCIES"
        }
      });

      // Dismiss loading and show success
      NotificationManager.dismissToast(loadingToast);
      NotificationManager.resumeCreated(name);

      setResumeName("");
      setShowDialog(false);

      navigate("/addresume", {
        state: { resumeId: newResume.id, resumeName: newResume.name },
      });
    }, 1000); // Small delay to show loading state
  };

  const handleDelete = (id) => {
    const resumeToDelete = resumes.find(r => r.id === id);
    const updatedList = resumes.filter((resume) => resume.id !== id);
    setResumes(updatedList);

    // Use StorageManager to delete resume
    StorageManager.deleteResume(id);
    StorageManager.saveResumesList(updatedList);
    
    // Show success notification
    NotificationManager.resumeDeleted(resumeToDelete?.name || "Resume");
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500"
      >
        My Resumes
      </motion.h1>
      <p className="text-gray-500 mt-2 mb-4">
        Create, preview, and manage your AI-powered resumes.
      </p>

      {/* Storage Info */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Resumes: {storageInfo.currentCount} / {storageInfo.maxCount}</span>
          <span>Storage: {storageInfo.sizeUsed} / {storageInfo.maxSize}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              storageInfo.currentCount >= storageInfo.maxCount 
                ? 'bg-red-500' 
                : storageInfo.currentCount >= storageInfo.maxCount * 0.8
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${(storageInfo.currentCount / storageInfo.maxCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {/* Add Resume Card */}
        <motion.div
          whileHover={storageInfo.currentCount < storageInfo.maxCount ? { scale: 1.05 } : {}}
          whileTap={storageInfo.currentCount < storageInfo.maxCount ? { scale: 0.95 } : {}}
          className={`w-full h-48 rounded-2xl flex items-center justify-center text-6xl font-bold shadow-lg transition ${
            storageInfo.currentCount >= storageInfo.maxCount
              ? 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-blue-200 via-purple-200 to-white text-blue-600 cursor-pointer hover:shadow-xl'
          }`}
          onClick={() => {
            if (storageInfo.currentCount < storageInfo.maxCount) {
              setShowDialog(true);
            } else {
              NotificationManager.storageLimit();
            }
          }}
        >
          {storageInfo.currentCount >= storageInfo.maxCount ? (
            <div className="text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-sm font-medium">Storage Full</div>
            </div>
          ) : (
            '+'
          )}
        </motion.div>

        {/* Resume Cards */}
        {resumes.map((resume, index) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full h-48 bg-white/70 backdrop-blur-lg border border-purple-100 rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold text-indigo-800 truncate">
              {resume.name}
            </h2>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => navigate(`/preview/${resume.id}`)}
                aria-label={`Preview ${resume.name}`}
                className="px-4 py-1 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow hover:from-indigo-600 hover:to-purple-600 transition"
              >
                Preview
              </button>
              <button
                onClick={() => handleDelete(resume.id)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-full font-semibold shadow hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Resumes Message */}
      {resumes.length === 0 && (
        <div className="text-gray-500 text-center mt-10">
          No resumes found. Click "+" to create one.
        </div>
      )}

      {/* Create Resume Modal */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-7 w-80 shadow-2xl border border-purple-200"
            >
              <h2 className="text-xl font-bold text-indigo-800 mb-4">
                Create New Resume
              </h2>
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter resume name"
                className="w-full p-3 border border-purple-200 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition shadow"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Temporary: Cross-platform notification test - Remove after testing */}
      <NotificationTest />
    </div>
  );
};

export default Dashboard;

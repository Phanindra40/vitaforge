// Resume Storage Utility
// Handles localStorage operations with multiple resume support

const STORAGE_KEYS = {
  RESUMES_LIST: "resumes", // List of resume metadata
  RESUMES_DATA: "resumesData", // Full resume data
};

const MAX_RESUMES = 5; // Maximum resumes allowed

export const StorageManager = {
  // Get all resume metadata
  getAllResumes: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESUMES_LIST)) || [];
    } catch (error) {
      console.error("Failed to load resumes list:", error);
      return [];
    }
  },

  // Get specific resume data
  getResumeData: (resumeId) => {
    try {
      const allData = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESUMES_DATA)) || {};
      return allData[resumeId] || null;
    } catch (error) {
      console.error("Failed to load resume data:", error);
      return null;
    }
  },

  // Save resume metadata
  saveResumesList: (resumes) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESUMES_LIST, JSON.stringify(resumes));
      return true;
    } catch (error) {
      console.error("Failed to save resumes list:", error);
      return false;
    }
  },

  // Save resume data
  saveResumeData: (resumeId, data) => {
    try {
      const allData = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESUMES_DATA)) || {};
      allData[resumeId] = data;
      localStorage.setItem(STORAGE_KEYS.RESUMES_DATA, JSON.stringify(allData));
      return true;
    } catch (error) {
      console.error("Failed to save resume data:", error);
      return false;
    }
  },

  // Delete resume
  deleteResume: (resumeId) => {
    try {
      // Remove from resumes list
      const resumes = StorageManager.getAllResumes();
      const updatedResumes = resumes.filter(resume => resume.id !== resumeId);
      StorageManager.saveResumesList(updatedResumes);

      // Remove resume data
      const allData = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESUMES_DATA)) || {};
      delete allData[resumeId];
      localStorage.setItem(STORAGE_KEYS.RESUMES_DATA, JSON.stringify(allData));
      
      return true;
    } catch (error) {
      console.error("Failed to delete resume:", error);
      return false;
    }
  },

  // Check if storage limit is reached
  canCreateNewResume: () => {
    const resumes = StorageManager.getAllResumes();
    return resumes.length < MAX_RESUMES;
  },

  // Get storage usage info
  getStorageInfo: () => {
    const resumes = StorageManager.getAllResumes();
    return {
      currentCount: resumes.length,
      maxCount: MAX_RESUMES,
      canCreate: resumes.length < MAX_RESUMES,
      remainingSlots: MAX_RESUMES - resumes.length
    };
  },

  // Clear all resume data (for debugging/reset)
  clearAllData: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.RESUMES_LIST);
      localStorage.removeItem(STORAGE_KEYS.RESUMES_DATA);
      return true;
    } catch (error) {
      console.error("Failed to clear storage:", error);
      return false;
    }
  },

  // Get storage size (approximate)
  getStorageSize: () => {
    try {
      const resumesList = localStorage.getItem(STORAGE_KEYS.RESUMES_LIST) || "[]";
      const resumesData = localStorage.getItem(STORAGE_KEYS.RESUMES_DATA) || "{}";
      
      const totalSize = (resumesList.length + resumesData.length) * 2; // Rough estimate (UTF-16)
      return {
        totalBytes: totalSize,
        totalKB: Math.round(totalSize / 1024),
        resumesListSize: resumesList.length * 2,
        resumesDataSize: resumesData.length * 2
      };
    } catch (error) {
      console.error("Failed to calculate storage size:", error);
      return { totalBytes: 0, totalKB: 0 };
    }
  }
};

export default StorageManager;
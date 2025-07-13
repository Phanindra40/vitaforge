// src/api/resume.js
import api from "./axios";

// CREATE resume
export const createResume = async (resumeData) => {
  try {
    const response = await api.post("/resumes", {
      data: resumeData, // required by Strapi REST API
    });
    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error.response?.data || error.message);
    throw error;
  }
};

// UPDATE resume
export const updateResume = async (id, updatedData) => {
  try {
    const response = await api.put(`/resumes/${id}`, {
      data: updatedData,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating resume:", error.response?.data || error.message);
    throw error;
  }
};

// GET resume by ID
export const fetchResume = async (id) => {
  try {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resume:", error.response?.data || error.message);
    throw error;
  }
};

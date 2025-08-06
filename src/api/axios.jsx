// src/api/axios.jsx
import axios from "axios";

// Create the axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api/gemini/generate", // change this for production
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you need to send cookies with requests
});

// Optional: Set token dynamically if you use auth later
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;

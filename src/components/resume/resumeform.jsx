// src/components/ResumeForm.jsx
import { useState } from "react";
import axios from "axios";

import PersonalInfoSection from "./sections/PersonalInfoSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection"; // ✅ NEW
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import Preview from "./Preview";

const ResumeForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [personalInfo, setPersonalInfo] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    GitHub: "",
    LinkedIn: "",
    customFields: [],
  });

  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]); // ✅ NEW
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Save all data including projects
  const saveToStrapi = async () => {
    const payload = {
      personalInfo,
      summary,
      experiences,
      projects, // ✅ include projects
      education,
      skills,
    };
    try {
      const res = await axios.post("http://localhost:1337/api/resumes", {
        data: payload,
      });
      console.log("✅ Saved to Strapi:", res.data);
    } catch (err) {
      console.error("❌ Error saving to Strapi:", err);
    }
  };

  const handleGeminiRequest = async (prompt) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:1337/api/gemini/generate", { prompt });
      const geminiText = response.data.response || response.data.text || "";
      setSummary(geminiText);
    } catch (error) {
      console.error("Gemini request failed:", error);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeminiSuggest = async (section, index, entry) => {
    try {
      setLoading(true);

      const prompt =
        section === "project"
          ? `Write a concise, impressive resume project description for a project titled "${entry.title}". Technologies used: ${entry.technologiesUsed}. Duration: ${entry.duration}.`
          : `Write a concise and impactful resume description for the role of ${entry.jobTitle} at ${entry.company}, using technologies: ${entry.technologiesUsed}`;

      const response = await axios.post("http://localhost:1337/api/gemini/generate", { prompt });

      const generatedText = response.data.text || response.data.response || "Generated description not available.";

      if (section === "project") {
        const updated = [...projects];
        updated[index].description = generatedText;
        setProjects(updated);
      } else {
        const updated = [...experiences];
        updated[index].description = generatedText;
        setExperiences(updated);
      }
    } catch (error) {
      console.error("AI generation failed", error);
      alert("Failed to generate description. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step Definitions
  const steps = [
    {
      title: "Personal Info",
      component: (
        <PersonalInfoSection
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          onNext={() => setCurrentStep((prev) => prev + 1)}
        />
      ),
    },
    {
      title: "Summary",
      component: (
        <SummarySection
          data={summary}
          onUpdate={setSummary}
          loading={loading}
          onGeminiRequest={handleGeminiRequest}
          onNext={() => setCurrentStep((prev) => prev + 1)}
          onBack={() => setCurrentStep((prev) => prev - 1)}
        />
      ),
    },
    {
      title: "Experience",
      component: (
        <ExperienceSection
          data={experiences}
          onUpdate={setExperiences}
          onGeminiSuggest={handleGeminiSuggest}
          loading={loading}
          onNext={() => setCurrentStep((prev) => prev + 1)}
          onBack={() => setCurrentStep((prev) => prev - 1)}
        />
      ),
    },
    {
      title: "Projects", // ✅ NEW
      component: (
        <ProjectsSection
          data={projects}
          onUpdate={setProjects}
          onGeminiSuggest={handleGeminiSuggest}
          loading={loading}
          onNext={() => setCurrentStep((prev) => prev + 1)}
          onBack={() => setCurrentStep((prev) => prev - 1)}
        />
      ),
    },
    {
  title: "Education",
  component: (
    <EducationSection
      data={education}
      onChange={(data) => setEducation(data)}
      onBack={() => setCurrentStep((prev) => prev - 1)}
      onSave={(data) => setEducation(data)}
      onNext={() => setCurrentStep((prev) => prev + 1)}
    />
  ),
},
    {
  title: "Skills",
  component: (
    <SkillsSection
      data={skills}
      onChange={(data) => setSkills(data)}
      onBack={() => setCurrentStep((prev) => prev - 1)}
      onSave={(data) => setSkills(data)}
    />
  ),
},
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-tr from-purple-100 to-white min-h-screen p-6">
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">
          📝 Build Your Resume
        </h1>

        {/* Progress Bar */}
        <div className="w-full bg-purple-200 rounded-full h-3 mb-6">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {steps[currentStep].component}
      </div>

      <div className="w-full md:w-1/3 sticky top-6">
        <Preview
          personalInfo={personalInfo}
          summary={summary}
          experiences={experiences}
          projects={projects} // ✅ Pass to preview
          education={education}
          skills={skills}
        />
      </div>
    </div>
  );
};

export default ResumeForm;

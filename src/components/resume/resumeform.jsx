import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import PersonalInfoSection from "./sections/PersonalInfoSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import Preview from "./Preview";
import ErrorBoundary from "./ErrorBoundary";
import { useReactToPrint } from "react-to-print";


const ResumeForm = ({ resumeName }) => {
  const [step, setStep] = useState(1);
  const [resumeId, setResumeId] = useState(null);

  const resumeRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "VitaForge_Resume",
    removeAfterPrint: true,
  });


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
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  // Resume ID generation and reset logic
  useEffect(() => {
    let storedId = localStorage.getItem("resumeId");
    if (!storedId || resumeName?.toLowerCase()?.includes("new")) {
      storedId = uuidv4();
      localStorage.setItem("resumeId", storedId);
    }
    setResumeId(storedId);
  }, [resumeName]); // react when resumeName changes

  // Resume Data loading
  useEffect(() => {
    if (resumeId) {
      const allResumes = JSON.parse(localStorage.getItem("resumeData")) || {};
      const data = allResumes[resumeId];
      if (data) {
        setPersonalInfo(data.personalInfo || {});
        setSummary(data.summary || "");
        setExperiences(data.experiences || []);
        setProjects(data.projects || []);
        setEducation(data.education || []);
        setSkills(data.skills || []);
      }
    }
  }, [resumeId]);

  // Save to localStorage
  const saveResume = (updatedFields = {}) => {
    const payload = {
      personalInfo,
      summary,
      experiences,
      projects,
      education,
      skills,
      ...updatedFields,
    };
    const allResumes = JSON.parse(localStorage.getItem("resumeData")) || {};
    allResumes[resumeId] = payload;
    localStorage.setItem("resumeData", JSON.stringify(allResumes));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  if (!resumeId) {
    return <div className="text-center mt-10">Generating resume ID...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-tr from-purple-100 to-white min-h-screen p-6">
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            📝 {resumeName || "Build Your Resume"}
          </h1>

          {/* Progress bar */}
          <div className="w-full bg-purple-200 rounded-full h-3 mb-6">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>

          {/* Step-based rendering */}
          {step === 1 && (
            <PersonalInfoSection
              personalInfo={personalInfo}
              setPersonalInfo={(info) => {
                setPersonalInfo(info);
                saveResume({ personalInfo: info });
              }}
              onNext={nextStep}
              resumeId={resumeId}
            />
          )}

          {step === 2 && (
            <SummarySection
              data={summary}
              onUpdate={(val) => {
                setSummary(val);
                saveResume({ summary: val });
              }}
              onNext={nextStep}
              onBack={prevStep}
              resumeId={resumeId}
            />
          )}

          {step === 3 && (
            <ExperienceSection
              data={experiences}
              onUpdate={(val) => {
                setExperiences(val);
                saveResume({ experiences: val });
              }}
              onNext={nextStep}
              onBack={prevStep}
              resumeId={resumeId}
            />
          )}

          {step === 4 && (
            <ProjectsSection
              data={projects}
              onUpdate={(val) => {
                setProjects(val);
                saveResume({ projects: val });
              }}
              onNext={nextStep}
              onBack={prevStep}
              resumeId={resumeId}
            />
          )}

          {step === 5 && (
            <EducationSection
              data={education}
              onChange={(val) => {
                setEducation(val);
                saveResume({ education: val });
              }}
              onSave={(val) => {
                setEducation(val);
                saveResume({ education: val });
              }}
              onNext={nextStep}
              onBack={prevStep}
              resumeId={resumeId}
            />
          )}

          {step === 6 && (
            <SkillsSection
              data={skills}
              onChange={(val) => {
                setSkills(val);
                saveResume({ skills: val });
              }}
              onSave={(val) => {
                setSkills(val);
                saveResume({ skills: val });
                nextStep();
              }}
              onBack={prevStep}
              resumeId={resumeId}
            />
          )}

          {/* Full preview with print button */}
          {step === 7 && (
            <Preview
              personalInfo={personalInfo}
              summary={summary}
              experiences={experiences}
              projects={projects}
              education={education}
              skills={skills}
              resumeRef={resumeRef}
              handlePrint={handlePrint}
            />
          )}
        </div>

        {/* Side preview panel */}
        <div className="w-full md:w-1/3 sticky top-6">
          {step !== 7 && (
            <Preview
              personalInfo={personalInfo}
              summary={summary}
              experiences={experiences}
              projects={projects}
              education={education}
              skills={skills}
              isMini={true}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ResumeForm;
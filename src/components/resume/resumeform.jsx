import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import PersonalInfoSection from "./sections/PersonalInfoSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import Preview from "./Preview";
import ErrorBoundary from "./ErrorBoundary";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeForm = ({ resumeId: propResumeId, resumeName: propResumeName }) => {
  const location = useLocation();
  const stateData = location.state || {};

  const [resumeId, setResumeId] = useState(null);
  const [resumeName, setResumeName] = useState(
    propResumeName || stateData.resumeName || "Untitled Resume"
  );

  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const resumeRef = useRef(null);

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
  const [isLoading, setIsLoading] = useState(true);

  // Initialize resume
  useEffect(() => {
    const id = propResumeId || stateData.resumeId || uuidv4();
    setResumeId(id);

    const allResumes = JSON.parse(localStorage.getItem("resumeData")) || {};
    const data = allResumes[id];

    if (data) {
      setPersonalInfo({ ...personalInfo, ...data.personalInfo });
      setSummary(data.summary || "");
      setExperiences(data.experiences || []);
      setProjects(data.projects || []);
      setEducation(data.education || []);
      setSkills(data.skills || []);
    }

    setIsLoading(false);
  }, [propResumeId, stateData.resumeId]);

  // Save to localStorage
  const saveResume = useCallback(
    (updatedFields = {}) => {
      if (!resumeId || isLoading) return;
      const currentData = {
        personalInfo,
        summary,
        experiences,
        projects,
        education,
        skills,
        resumeName,
        ...updatedFields,
      };
      const allResumes = JSON.parse(localStorage.getItem("resumeData")) || {};
      allResumes[resumeId] = currentData;
      localStorage.setItem("resumeData", JSON.stringify(allResumes));
    },
    [resumeId, isLoading, personalInfo, summary, experiences, projects, education, skills, resumeName]
  );

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Download PDF function with multipage support
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    // Save original class
    const originalClass = resumeRef.current.className;

    // Remove gradient / Tailwind classes and apply fallback styles
    resumeRef.current.className = "bg-white text-black max-w-[800px] mx-auto";
    resumeRef.current.style.color = "black"; // Ensure text color is supported
    resumeRef.current.style.backgroundColor = "white"; // Ensure background color is supported

    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(
        (personalInfo.FullName
          ? personalInfo.FullName.replace(/\s+/g, "_")
          : "VitaForge_Resume") + ".pdf"
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore original classes and styles
      resumeRef.current.className = originalClass;
      resumeRef.current.style.color = ""; // Reset text color
      resumeRef.current.style.backgroundColor = ""; // Reset background color
    }
  };

  if (isLoading) return null;

  return (
    <ErrorBoundary>
      <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-tr from-purple-100 to-white min-h-screen p-6">
        {/* Main form */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">
            📝 {resumeName || "Build Your Resume"}
          </h1>

          {/* Progress bar */}
          <div className="w-full bg-purple-200 rounded-full h-3 mb-6">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>

          {/* Step components */}
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
          {step === 7 && (
            <Preview
              ref={resumeRef} // For PDF download
              personalInfo={personalInfo}
              summary={summary}
              experiences={experiences}
              projects={projects}
              education={education}
              skills={skills}
              handleDownloadPDF={handleDownloadPDF} // pass button
            />
          )}
        </div>

        {/* Side preview */}
        <div className="w-full md:w-1/3 sticky top-6 max-h-[90vh] overflow-y-auto">
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

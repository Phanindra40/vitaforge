import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Confetti from 'react-confetti';

import PersonalInfoSection from "./sections/PersonalInfoSection";
import SummarySection from "./sections/SummarySection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import Preview from "./Preview";
import ErrorBoundary from "./ErrorBoundary";
import StorageManager from "../../utils/storage";
import { NotificationManager } from "../../utils/notifications.jsx";
import { CookieManager } from "../../utils/cookies";

const ResumeForm = ({ resumeId: propResumeId, resumeName: propResumeName }) => {
  const location = useLocation();
  const stateData = location.state || {};

  const [resumeId, setResumeId] = useState(null);
  const [resumeName] = useState(
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
  const [sectionTitles, setSectionTitles] = useState({
    summary: "PROFESSIONAL SUMMARY",
    experience: "PROFESSIONAL EXPERIENCE", 
    projects: "KEY PROJECTS",
    education: "EDUCATION",
    skills: "CORE COMPETENCIES"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  // AI suggestion handler (placeholder for now since no backend)
  const handleGeminiSuggest = (type, index, data) => {
    console.log("AI suggestion requested:", { type, index, data });
    // This would integrate with your AI backend when available
    NotificationManager.info(
      "🚀 AI suggestions feature coming soon! This will help optimize your resume content.",
      { duration: 4000 }
    );
  };

  // Enhanced browser print function
  const handleBrowserPrint = () => {
    try {
      console.log("Opening browser print dialog...");
      
      // Try to find any resume content
      let resumeContent = resumeRef.current;
      
      // If no ref, try to find resume content by class
      if (!resumeContent) {
        resumeContent = document.querySelector('.resume-content');
      }
      
      if (!resumeContent) {
        NotificationManager.error(
          "Resume content not found. Please make sure you have filled in some information.",
          { duration: 4000 }
        );
        return;
      }

      console.log("Resume content found:", resumeContent);

      // Create a temporary print container
      const printContainer = document.createElement('div');
      printContainer.className = 'print-container';
      printContainer.style.display = 'none';
      
      // Clone the resume content
      const resumeClone = resumeContent.cloneNode(true);
      resumeClone.style.display = 'block';
      resumeClone.style.visibility = 'visible';
      resumeClone.style.position = 'static';
      resumeClone.style.transform = 'none';
      resumeClone.style.fontSize = '12px';
      resumeClone.style.fontFamily = 'Times New Roman, serif';
      resumeClone.style.color = '#000000';
      resumeClone.style.background = '#ffffff';
      resumeClone.style.padding = '20px';
      resumeClone.style.width = '100%';
      resumeClone.style.maxWidth = 'none';
      resumeClone.classList.remove('shadow-lg', 'p-4', 'text-xs');
      
      printContainer.appendChild(resumeClone);
      document.body.appendChild(printContainer);
      
      // Add print-ready class to body
      document.body.classList.add('print-mode');
      
      // Show print container
      printContainer.style.display = 'block';
      
      // Show print ready notification
      NotificationManager.printReady();
      
      // Trigger browser print
      window.print();
      
      // Clean up after print dialog
      setTimeout(() => {
        document.body.classList.remove('print-mode');
        document.body.removeChild(printContainer);
      }, 1000);
      
    } catch (error) {
      console.error("Browser print error:", error);
      NotificationManager.error(
        `Print failed: ${error.message}. Please try using Ctrl+P manually.`,
        { duration: 6000 }
      );
    }
  };

  // Initialize resume
  useEffect(() => {
    const id = propResumeId || stateData.resumeId || uuidv4();
    setResumeId(id);

    const data = StorageManager.getResumeData(id);

    if (data) {
      setPersonalInfo({
        FullName: "",
        Email: "",
        Phone: "",
        GitHub: "",
        LinkedIn: "",
        customFields: [],
        ...data.personalInfo
      });
      setSummary(data.summary || "");
      setExperiences(data.experiences || []);
      setProjects(data.projects || []);
      setEducation(data.education || []);
      setSkills(data.skills || []);
      setSectionTitles({ 
        summary: "PROFESSIONAL SUMMARY",
        experience: "PROFESSIONAL EXPERIENCE", 
        projects: "KEY PROJECTS",
        education: "EDUCATION",
        skills: "CORE COMPETENCIES",
        ...data.sectionTitles 
      });
    }

    setIsLoading(false);
  }, [propResumeId, stateData.resumeId]);

  // Save to localStorage using StorageManager
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
        sectionTitles,
        resumeName,
        ...updatedFields,
      };
      
      const success = StorageManager.saveResumeData(resumeId, currentData);
      
      if (success && CookieManager.getPreferences().notifications.showSuccess) {
        // Show subtle save confirmation
        NotificationManager.success(
          "💾 Changes saved automatically",
          { duration: 2000 }
        );
      }
    },
    [resumeId, isLoading, personalInfo, summary, experiences, projects, education, skills, sectionTitles, resumeName]
  );

  const nextStep = () => {
    const newStep = Math.min(step + 1, totalSteps);
    setStep(newStep);
    
    // Celebrate when reaching the final step
    if (newStep === totalSteps) {
      // Show confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Stop after 5 seconds
      
      setTimeout(() => {
        NotificationManager.resumeCompleted(resumeName);
        
        // Show tip about printing
        setTimeout(() => {
          NotificationManager.tipOfTheDay(
            "Your resume is complete! Use the 'Print Resume' button to download or print your professional resume."
          );
        }, 2000);
      }, 500);
    }
  };
  
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  if (isLoading) return null;

  return (
    <ErrorBoundary>
      {/* Confetti for celebration */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          gravity={0.1}
          colors={['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']}
        />
      )}
      
      <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-tr from-purple-100 to-white min-h-screen p-6">
        {/* Main form */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            {resumeName || "Build Your Professional Resume"}
          </h1>

          {/* Mobile hint - shows only on mobile */}
          <div className="block md:hidden bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-700">
              <span className="font-semibold">💡 Pro Tip:</span> For the best experience with live preview, consider using a laptop or desktop computer.
            </p>
          </div>

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
              onGeminiSuggest={handleGeminiSuggest}
              loading={false}
              onNext={nextStep}
              onBack={prevStep}
              resumeId={resumeId}
              sectionTitle={sectionTitles.experience}
              onSectionTitleChange={(title) => {
                const updatedTitles = { ...sectionTitles, experience: title };
                setSectionTitles(updatedTitles);
                saveResume({ sectionTitles: updatedTitles });
              }}
            />
          )}
          {step === 4 && (
            <ProjectsSection
              data={projects}
              onUpdate={(val) => {
                setProjects(val);
                saveResume({ projects: val });
              }}
              onGeminiSuggest={handleGeminiSuggest}
              loading={false}
              onNext={nextStep}
              onBack={prevStep}
              resumeId={resumeId}
              sectionTitle={sectionTitles.projects}
              onSectionTitleChange={(title) => {
                const updatedTitles = { ...sectionTitles, projects: title };
                setSectionTitles(updatedTitles);
                saveResume({ sectionTitles: updatedTitles });
              }}
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
              sectionTitle={sectionTitles.education}
              onSectionTitleChange={(title) => {
                const updatedTitles = { ...sectionTitles, education: title };
                setSectionTitles(updatedTitles);
                saveResume({ sectionTitles: updatedTitles });
              }}
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
              sectionTitle={sectionTitles.skills}
              onSectionTitleChange={(title) => {
                const updatedTitles = { ...sectionTitles, skills: title };
                setSectionTitles(updatedTitles);
                saveResume({ sectionTitles: updatedTitles });
              }}
            />
          )}
          {step === 7 && (
            <div className="space-y-6">
              {/* Mobile message for final step */}
              <div className="block md:hidden bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 shadow-lg mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🎉📱</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Resume Complete!
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your resume is ready! However, the preview and download features work best on desktop.
                  </p>
                  <div className="bg-white/70 p-4 rounded-lg border border-green-100 mb-4">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      📋 <strong>Next Steps:</strong>
                    </p>
                    <ul className="text-xs text-gray-600 text-left space-y-1">
                      <li>• Switch to a laptop/desktop for best preview & download experience</li>
                      <li>• Your progress is automatically saved</li>
                      <li>• You can continue from where you left off</li>
                    </ul>
                  </div>
                  <button
                    onClick={handleBrowserPrint}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                    title="Opens browser print dialog - save as PDF"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Try Download (Mobile)
                  </button>
                </div>
              </div>

              {/* Desktop version */}
              <div className="hidden md:block">
                {/* Download Button - Print as PDF (Most Reliable) */}
                <div className="no-print flex justify-end mb-6">
                  <button
                    onClick={handleBrowserPrint}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 flex items-center gap-2 text-lg"
                    title="Opens browser print dialog - save as PDF"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                </div>
                
                {/* Resume Preview Container */}
                <div 
                  className="bg-white p-0 border-0"
                  style={{
                    backgroundColor: '#ffffff',
                    margin: '0 auto',
                    maxWidth: '794px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Preview
                    ref={resumeRef} // For PDF download
                    personalInfo={personalInfo}
                    summary={summary}
                    experiences={experiences}
                    projects={projects}
                    education={education}
                    skills={skills}
                    sectionTitles={sectionTitles}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side preview */}
        <div className="w-full md:w-1/3 sticky top-6 max-h-[90vh] overflow-y-auto">
          {step !== 7 && (
            <>
              {/* Mobile message - shows only on mobile */}
              <div className="block md:hidden bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 shadow-lg">
                <div className="text-center">
                  <div className="text-4xl mb-3">📱💻</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Preview Not Available on Mobile
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The live resume preview is optimized for larger screens. For the best experience with real-time preview:
                  </p>
                  <div className="bg-white/70 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-700 font-medium">
                      💡 <strong>Tip:</strong> Use a laptop or desktop computer to see your resume preview as you build it!
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Don't worry - you can still create your resume on mobile and download it at the end.
                  </p>
                </div>
              </div>

              {/* Desktop preview - shows only on desktop */}
              <div className="hidden md:block">
                <Preview
                  ref={step !== 7 ? resumeRef : null}
                  personalInfo={personalInfo}
                  summary={summary}
                  experiences={experiences}
                  projects={projects}
                  education={education}
                  skills={skills}
                  sectionTitles={sectionTitles}
                  isMini={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ResumeForm;

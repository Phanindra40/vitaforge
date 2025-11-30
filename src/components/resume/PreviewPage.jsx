import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Preview from "./Preview";

const PreviewPage = () => {
  const { resumeId } = useParams();
  const [data, setData] = useState(null);
  const resumeRef = useRef(null);

  useEffect(() => {
    try {
      const allResumes = JSON.parse(localStorage.getItem("resumesData") || "{}");
      setData(allResumes[resumeId] || null);
    } catch (error) {
      console.error("Error loading resume data:", error);
      setData(null);
    }
  }, [resumeId]);

  // Browser print function - same as in ResumeForm
  const handleBrowserPrint = () => {
    try {
      console.log("Opening browser print dialog...");
      
      // Temporarily hide non-print elements
      const noPrintElements = document.querySelectorAll('.no-print');
      noPrintElements.forEach(el => el.style.display = 'none');
      
      // Focus on the resume element
      if (resumeRef.current) {
        resumeRef.current.focus();
      }
      
      // Trigger browser print
      window.print();
      
      // Restore hidden elements after a short delay
      setTimeout(() => {
        noPrintElements.forEach(el => el.style.display = '');
      }, 1000);
      
      console.log("✅ Print dialog opened successfully!");
      
    } catch (error) {
      console.error("Browser print error:", error);
      alert("Unable to open print dialog. Please use Ctrl+P manually.");
    }
  };

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Resume not found or loading...</p>
        <a href="/" className="text-blue-500 underline">
          Go back to the homepage
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Download button (excluded from PDF) */}
        <div className="no-print mb-6 flex justify-between items-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Home
          </a>
          <button
            onClick={handleBrowserPrint}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center gap-2"
            title="Opens browser print dialog - save as PDF"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>

        {/* Resume content that goes into PDF */}
        <div ref={resumeRef} className="resume-print-area">
          <Preview
            personalInfo={data.personalInfo}
            summary={data.summary}
            experiences={data.experiences}
            projects={data.projects}
            education={data.education}
            skills={data.skills}
            sectionTitles={data.sectionTitles}
          />
        </div>
      </div>
    </div>

  );
};

export default PreviewPage;

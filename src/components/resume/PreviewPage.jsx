import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Preview from "./Preview";

const PreviewPage = () => {
  const { resumeId } = useParams();
  const [data, setData] = useState(null);
  const resumeRef = useRef(null);

  useEffect(() => {
    try {
      const allResumes = JSON.parse(localStorage.getItem("resumeData") || "{}");
      setData(allResumes[resumeId] || null);
    } catch (error) {
      console.error("Error loading resume data:", error);
      setData(null);
    }
  }, [resumeId]);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "My_Resume",
    onAfterPrint: () => console.log("✅ PDF generated successfully!"),
  });

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
    <div className="p-6">
  {/* Download button (excluded from PDF) */}
  <div className="no-print mb-4 text-right">
    <button
      onClick={handlePrint}
      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
    >
      💾 Download PDF
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
    />
  </div>
</div>

  );
};

export default PreviewPage;

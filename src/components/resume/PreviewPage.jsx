import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
      <Preview
        ref={resumeRef}
        personalInfo={data.personalInfo}
        summary={data.summary}
        experiences={data.experiences}
        projects={data.projects}
        education={data.education}
        skills={data.skills}
      />
    </div>
  );
};

export default PreviewPage;

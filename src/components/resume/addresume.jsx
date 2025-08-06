// /src/pages/addresume/AddResume.jsx
import { useLocation } from "react-router-dom";
import ResumeForm from "./resumeform";

const AddResume = () => {
  const location = useLocation();
  const { resumeId, resumeName } = location.state || {};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Resume</h1>
      <ResumeForm resumeId={resumeId} resumeName={resumeName} />
    </div>
  );
};

export default AddResume;

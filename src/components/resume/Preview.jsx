import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ErrorBoundary from "./ErrorBoundary";
import "../../index.css"; // Ensure styles are imported

const Preview = ({ personalInfo, summary, experiences, education, projects, skills }) => {
  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "VitaForge_Resume",
    removeAfterPrint: true,
  });

  return (
    <ErrorBoundary>
      {/* Print Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handlePrint}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition"
        >
          🖨️ Print Resume
        </button>
      </div>

      {/* Resume Content */}
      <div
        ref={resumeRef}
        className="bg-white shadow-2xl rounded-2xl p-8 border border-blue-100"
        id="resume-preview"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-t-xl px-6 py-5 mb-4">
          <h1 className="text-3xl font-bold tracking-wide">
            {personalInfo.FullName || personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-sm mt-1">
            {(personalInfo.Email || personalInfo.email || "email@example.com")} |{" "}
            {(personalInfo.Phone || personalInfo.phone || "123-456-7890")}
          </p>
          {(personalInfo.LinkedIn || personalInfo.linkedIn || personalInfo.GitHub || personalInfo.gitHub) && (
            <p className="text-sm mt-1">
              {(personalInfo.LinkedIn || personalInfo.linkedIn) && (
                <span className="mr-2">
                  <a
                    href={personalInfo.LinkedIn || personalInfo.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    LinkedIn
                  </a>
                </span>
              )}
              {(personalInfo.GitHub || personalInfo.gitHub) && (
                <span>
                  <a
                    href={personalInfo.GitHub || personalInfo.gitHub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    GitHub
                  </a>
                </span>
              )}
            </p>
          )}

          {/* Custom Fields */}
          {Array.isArray(personalInfo.customFields) && personalInfo.customFields.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-3">
              {personalInfo.customFields.map((field, idx) =>
                field.label && field.value ? (
                  <div key={idx} className="text-xs bg-white/20 px-3 py-1 rounded-full">
                    <span className="font-semibold">{field.label}:</span> {field.value}
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {summary && summary.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mb-2">
              Summary
            </h2>
            {Array.isArray(summary) ? (
              <ul className="list-disc pl-5 text-gray-700">
                {summary.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">{summary}</p>
            )}
          </section>
        )}

        {/* Experience */}
        {Array.isArray(experiences) && experiences.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
              Experience
            </h2>
            {experiences.map((item, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-md font-semibold text-blue-700">
                  {item.jobTitle || item.role || item.name}
                  {item.company && ` at ${item.company}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {(item.startDate || item.start) || ""} - {(item.endDate || item.end) || ""}
                </p>
                <p className="text-gray-700">{item.description || item.desc}</p>
                {(item.technologiesUsed || item.technologies || item.tech) && (
                  <p className="text-sm italic text-gray-500">
                    Tech: {item.technologiesUsed || item.technologies || item.tech}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : (
          <p className="text-gray-400 italic mt-2">No experiences added yet.</p>
        )}

        {/* Education */}
        {Array.isArray(education) && education.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-md font-semibold">{edu.institute}</h3>
                <p className="text-sm text-gray-600">{edu.startDate} – {edu.endDate}</p>
                <p className="text-sm text-gray-700">{edu.degree}</p>
                {edu.technologies && (
                  <p className="text-sm italic text-gray-500">
                    Technologies: {edu.technologies}
                  </p>
                )}
                {edu.description && <p className="text-sm">{edu.description}</p>}
              </div>
            ))}
          </section>
        ) : (
          <p className="text-gray-400 italic mt-2">No education added yet.</p>
        )}

        {/* Projects */}
        {Array.isArray(projects) && projects.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
              Projects
            </h2>
            {projects.map((proj, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-md font-semibold text-purple-700">{proj.name || proj.title || "Project"}</h3>
                {(proj.startDate || proj.endDate) && (
                  <p className="text-sm text-gray-600">
                    {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                  </p>
                )}
                <p className="text-gray-700">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-sm italic text-gray-500">
                    Technologies: {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </section>
        ) : (
          <p className="text-gray-400 italic mt-2">No projects added yet.</p>
        )}

        {/* Skills Section */}
        {Array.isArray(skills) && skills.length > 0 ? (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 mb-2">
              Skills
            </h2>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                >
                  {typeof skill === "string" ? skill : skill.name || "Skill"}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="text-gray-400 italic mt-2">No skills added yet.</p>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Preview;

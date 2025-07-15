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
      {/* Print Button (hidden in print) */}
      <div className="mb-4 flex justify-end print:hidden">
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
        className="bg-white shadow-2xl rounded-2xl p-8 border border-blue-100 max-w-[800px] mx-auto print:shadow-none print:rounded-none print:border-0 print:p-0 print:max-w-full"
        id="resume-preview"
      >
        {/* Header */}
        <div className="flex flex-col items-center border-b-2 border-blue-100 pb-4 mb-6 print:border-gray-300">
          <h1 className="text-3xl font-bold tracking-wide text-gray-900">
            {personalInfo.FullName || personalInfo.fullName || "Your Name"}
          </h1>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-gray-700 text-sm">
            <span>{personalInfo.Email || personalInfo.email || "email@example.com"}</span>
            <span>|</span>
            <span>{personalInfo.Phone || personalInfo.phone || "123-456-7890"}</span>
            {(personalInfo.LinkedIn || personalInfo.linkedIn) && (
              <>
                <span>|</span>
                <a
                  href={personalInfo.LinkedIn || personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  LinkedIn
                </a>
              </>
            )}
            {(personalInfo.GitHub || personalInfo.gitHub) && (
              <>
                <span>|</span>
                <a
                  href={personalInfo.GitHub || personalInfo.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  GitHub
                </a>
              </>
            )}
          </div>
          {/* Custom Fields */}
          {Array.isArray(personalInfo.customFields) && personalInfo.customFields.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-3 justify-center">
              {personalInfo.customFields.map((field, idx) =>
                field.label && field.value ? (
                  <div key={idx} className="text-xs bg-blue-50 px-3 py-1 rounded-full print:bg-transparent">
                    <span className="font-semibold">{field.label}:</span> {field.value}
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {summary && summary.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-1 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300">
              Summary
            </h2>
            {Array.isArray(summary) ? (
              <ul className="list-disc pl-5 text-gray-800">
                {summary.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-800">{summary}</p>
            )}
          </section>
        )}

        {/* Experience */}
        {Array.isArray(experiences) && experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-1 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300">
              Experience
            </h2>
            {experiences.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="flex flex-wrap justify-between items-center">
                  <h3 className="text-md font-semibold text-blue-700">
                    {item.jobTitle || item.role || item.name}
                    {item.company && <span className="font-normal text-gray-700"> at {item.company}</span>}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {(item.startDate || item.start) || ""} - {(item.endDate || item.end) || ""}
                  </span>
                </div>
                <p className="text-gray-800">{item.description || item.desc}</p>
                {(item.technologiesUsed || item.technologies || item.tech) && (
                  <p className="text-xs italic text-gray-500">
                    Tech: {item.technologiesUsed || item.technologies || item.tech}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {Array.isArray(education) && education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-1 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex flex-wrap justify-between items-center">
                  <h3 className="text-md font-semibold">{edu.institute}</h3>
                  <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-sm text-gray-700">{edu.degree}</p>
                {edu.technologies && (
                  <p className="text-xs italic text-gray-500">
                    Technologies: {edu.technologies}
                  </p>
                )}
                {edu.description && <p className="text-sm">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {Array.isArray(projects) && projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-800 mb-1 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300">
              Projects
            </h2>
            {projects.map((proj, index) => (
              <div key={index} className="mb-3">
                <div className="flex flex-wrap justify-between items-center">
                  <h3 className="text-md font-semibold text-purple-700">{proj.name || proj.title || "Project"}</h3>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs text-gray-500">
                      {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                    </span>
                  )}
                </div>
                <p className="text-gray-800">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-xs italic text-gray-500">
                    Technologies: {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {Array.isArray(skills) && skills.length > 0 && (
          <section className="mb-2">
            <h2 className="text-lg font-bold text-blue-800 mb-1 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300">
              Skills
            </h2>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm print:bg-gray-200 print:text-black"
                >
                  {typeof skill === "string" ? skill : skill.name || "Skill"}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Preview;

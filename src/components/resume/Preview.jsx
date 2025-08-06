import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import logo from "../../assets/header.png";
import "../../index.css";

const Preview = ({
  personalInfo,
  summary,
  experiences,
  education,
  projects,
  skills,
  isMini,
  resumeRef,
  handlePrint,
}) => {
  return (
    <ErrorBoundary>
      {/* Only show print button if NOT mini */}
      {!isMini && (
        <div className="flex justify-end p-4 max-w-[800px] mx-auto print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
          >
            📄 Print / Download PDF
          </button>
        </div>
      )}

      {/* Resume Content */}
      <div className="relative z-10">
        <div
          ref={resumeRef}
          className="bg-white shadow-2xl rounded-2xl p-8 border border-blue-100 max-w-[800px] mx-auto print:shadow-none print:rounded-none print:border-0 print:p-0 print:max-w-full print:bg-white relative"
          id="resume-preview"
          style={{ fontFamily: "Inter, Arial, sans-serif" }}
        >
          {/* Header */}
          <div className="flex flex-col items-center border-b border-blue-200 pb-4 mb-6 print:border-gray-300">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 print:text-black">
              {personalInfo.FullName || personalInfo.fullName || "Your Name"}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-4 text-gray-700 text-base print:text-black">
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
                    className="underline text-blue-700 print:text-black"
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
                    className="underline text-blue-700 print:text-black"
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
                    <div key={idx} className="text-xs bg-blue-50 px-3 py-1 rounded-full print:bg-transparent print:text-black">
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
              <h2 className="text-xl font-bold text-blue-800 print:text-black mb-2 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300 uppercase">
                Summary
              </h2>
              {Array.isArray(summary) ? (
                <ul className="list-disc pl-5 text-gray-800 print:text-black">
                  {summary.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800 print:text-black">{summary}</p>
              )}
            </section>
          )}

          {/* Experience */}
          {Array.isArray(experiences) && experiences.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 print:text-black mb-2 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300 uppercase">
                Experience
              </h2>
              {experiences.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-lg font-semibold text-blue-700 print:text-black">
                      {item.jobTitle || item.role || item.name}
                      {item.company && <span className="font-normal text-gray-700 print:text-black"> at {item.company}</span>}
                    </h3>
                    <span className="text-xs text-gray-500 print:text-black">
                      {(item.startDate || item.start) || ""} - {(item.endDate || item.end) || ""}
                    </span>
                  </div>
                  <p className="text-gray-800 print:text-black">{item.description || item.desc}</p>
                  {(item.technologiesUsed || item.technologies || item.tech) && (
                    <p className="text-xs italic text-gray-500 print:text-black">
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
              <h2 className="text-xl font-bold text-blue-800 print:text-black mb-2 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300 uppercase">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 print:text-black">{edu.institute}</h3>
                    <span className="text-xs text-gray-500 print:text-black">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-700 print:text-black">{edu.degree}</p>
                  {edu.technologies && (
                    <p className="text-xs italic text-gray-500 print:text-black">
                      Technologies: {edu.technologies}
                    </p>
                  )}
                  {edu.description && <p className="text-sm print:text-black">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {Array.isArray(projects) && projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-800 print:text-black mb-2 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300 uppercase">
                Projects
              </h2>
              {projects.map((proj, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-wrap justify-between items-center">
                    <h3 className="text-lg font-semibold text-purple-700 print:text-black">{proj.name || proj.title || "Project"}</h3>
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-xs text-gray-500 print:text-black">
                        {proj.startDate} {proj.endDate && `– ${proj.endDate}`}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 print:text-black">{proj.description}</p>
                  {proj.technologies && (
                    <p className="text-xs italic text-gray-500 print:text-black">
                      Technologies: {proj.technologies}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {Array.isArray(skills) && skills.length > 0 && (
            <section className="mb-2">
              <h2 className="text-xl font-bold text-blue-800 print:text-black mb-2 tracking-wide border-b border-blue-100 pb-1 print:border-gray-300 uppercase">
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

          {/* Branding Watermark (only print) */}
          <div className="w-full flex-col items-center mt-10 pt-6 border-t border-blue-100 print:border-gray-300 hidden print:flex">
            <img
              src={logo}
              alt="VitaForge Logo"
              className="h-10 w-10 mb-1 print:h-8 print:w-8"
              style={{ objectFit: "contain", opacity: 0.5 }}
            />
            <span className="text-xs text-gray-400 print:text-gray-500" style={{ opacity: 0.7 }}>
              Built with <span className="font-semibold text-blue-600 print:text-black">VitaForge</span>
            </span>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Preview;

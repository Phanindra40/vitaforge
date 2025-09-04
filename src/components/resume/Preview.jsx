import React from "react";
import "../../index.css";

const Preview = React.forwardRef(
  (
    {
      personalInfo = {},
      summary = "",
      experiences = [],
      education = [],
      projects = [],
      skills = [],
      isMini = false,
      handleDownloadPDF,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${
          isMini
            ? "bg-gray-50 shadow-md rounded-xl p-6"
            : "bg-white text-black max-w-[850px] mx-auto p-10 shadow-md rounded-lg"
        } border border-gray-300`}
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
        }}
      >
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {personalInfo.FullName || "Your Name"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {personalInfo.Email && (
              <a
                href={`mailto:${personalInfo.Email}`}
                className="underline hover:text-blue-600"
              >
                {personalInfo.Email}
              </a>
            )}
            {personalInfo.Phone && <span> • {personalInfo.Phone}</span>}
            {personalInfo.LinkedIn && (
              <span>
                {" "}
                •{" "}
                <a
                  href={personalInfo.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {personalInfo.GitHub && (
              <span>
                {" "}
                •{" "}
                <a
                  href={personalInfo.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  GitHub
                </a>
              </span>
            )}
          </p>
        </header>

        {/* Summary Section */}
        {summary && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-3">
              Experience
            </h2>
            <ul className="space-y-5">
              {experiences.map((exp, idx) => (
                <li key={idx}>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{exp.company || "Company Name"}</span>
                    <span className="text-gray-500">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-sm italic text-gray-700">{exp.role}</div>
                  <p className="text-sm text-gray-800 mt-1">
                    {exp.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-3">
              Projects
            </h2>
            <ul className="space-y-5">
              {projects.map((proj, idx) => (
                <li key={idx}>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{proj.name || "Project Name"}</span>
                    <span className="text-gray-500">
                      {proj.technologies?.join(", ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">
                    {proj.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-3">
              Education
            </h2>
            <ul className="space-y-5">
              {education.map((edu, idx) => (
                <li key={idx}>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{edu.institution || "Institution"}</span>
                    <span className="text-gray-500">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-sm italic text-gray-700">
                    {edu.degree}
                  </div>
                  <p className="text-sm text-gray-800 mt-1">
                    {edu.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b-2 border-blue-100 pb-1 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Download Button */}
        {!isMini && handleDownloadPDF && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300"
            >
              💾 Download PDF
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default Preview;

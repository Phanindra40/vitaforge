import React from "react";
import logo from "../../assets/header.png";
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
    const ContactLink = ({ label, url }) =>
      url ? (
        <>
          <span className="hidden sm:inline">|</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 print:text-black"
          >
            {label}
          </a>
        </>
      ) : null;

    return (
      <>
        {!isMini && handleDownloadPDF && (
          <div className="flex justify-end p-4 max-w-[800px] mx-auto print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
            >
              💾 Download PDF
            </button>
          </div>
        )}

        <div
          ref={ref}
          className="bg-white shadow-2xl rounded-2xl p-8 border border-blue-100 max-w-[800px] mx-auto print:shadow-none print:rounded-none print:border-0 print:p-0 print:max-w-full print:bg-white relative"
          style={{ fontFamily: "Inter, Arial, sans-serif", backgroundColor: "#ffffff" }}
        >
          <header className="text-center border-b pb-4 mb-6">
            {logo && (
              <img
                src={logo}
                alt="logo"
                className="w-12 h-12 mx-auto mb-2 print:hidden"
              />
            )}
            <h1 className="text-2xl font-bold">
              {personalInfo.FullName || "Your Name"}
            </h1>
            <p className="text-gray-700">
              {personalInfo.Email && (
                <a href={`mailto:${personalInfo.Email}`} className="underline">
                  {personalInfo.Email}
                </a>
              )}
              {personalInfo.Phone && <span> | {personalInfo.Phone}</span>}
              {personalInfo.Location && <span> | {personalInfo.Location}</span>}
              <ContactLink label="LinkedIn" url={personalInfo.LinkedIn} />
              <ContactLink label="GitHub" url={personalInfo.GitHub} />
              <ContactLink label="Portfolio" url={personalInfo.Portfolio} />
            </p>
          </header>

          {summary && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
                Professional Summary
              </h2>
              <p className="text-gray-800 text-sm leading-relaxed">{summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
                Experience
              </h2>
              <ul className="space-y-3">
                {experiences.map((exp, idx) => (
                  <li key={idx}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{exp.company || "Company Name"}</span>
                      <span className="text-gray-600">
                        {exp.startDate} – {exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-sm italic">{exp.role}</div>
                    <p className="text-gray-700 text-sm">{exp.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
                Projects
              </h2>
              <ul className="space-y-3">
                {projects.map((proj, idx) => (
                  <li key={idx}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{proj.name || "Project Name"}</span>
                      <span className="text-gray-600">
                        {proj.technologies?.join(", ")}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{proj.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
                Education
              </h2>
              <ul className="space-y-3">
                {education.map((edu, idx) => (
                  <li key={idx}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{edu.institution || "Institution"}</span>
                      <span className="text-gray-600">
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                    <div className="text-sm italic">{edu.degree}</div>
                    <p className="text-gray-700 text-sm">{edu.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
                Skills
              </h2>
              <p className="text-gray-800 text-sm">{skills.join(" • ")}</p>
            </section>
          )}
        </div>
      </>
    );
  }
);

export default Preview;

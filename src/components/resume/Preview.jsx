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
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`resume-content ${
          isMini
            ? "shadow-lg p-4 text-xs"
            : "mx-auto"
        }`}
        style={{
          fontFamily: "'Times New Roman', serif",
          lineHeight: "1.4",
          fontSize: isMini ? "10px" : "12px",
          width: isMini ? "auto" : "794px", // A4 width in pixels at 96 DPI
          minHeight: isMini ? "auto" : "1123px", // A4 height in pixels at 96 DPI
          padding: isMini ? "16px" : "40px 30px",
          color: "#000000",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
          border: "none",
          outline: "none",
          margin: "0",
        }}
      >
        {/* Header Section */}
        <header className="text-center mb-6 border-b-2 border-gray-800 pb-4">
          <h1 
            className="text-2xl font-bold mb-2 uppercase tracking-wide"
            style={{ 
              fontSize: isMini ? "14px" : "20px",
              fontWeight: "bold",
              color: "#000000",
              letterSpacing: "1px"
            }}
          >
            {personalInfo.FullName || "YOUR NAME"}
          </h1>
          <div 
            className="text-sm"
            style={{ 
              fontSize: isMini ? "8px" : "11px",
              color: "#333333"
            }}
          >
            {personalInfo.Email && (
              <span className="mr-3">
                {personalInfo.Email}
              </span>
            )}
            {personalInfo.Phone && (
              <span className="mr-3">
                {personalInfo.Phone}
              </span>
            )}
            {personalInfo.LinkedIn && (
              <span className="mr-3">
                LinkedIn: {personalInfo.LinkedIn.replace(/https?:\/\/(www\.)?/, '')}
              </span>
            )}
            {personalInfo.GitHub && (
              <span>
                GitHub: {personalInfo.GitHub.replace(/https?:\/\/(www\.)?/, '')}
              </span>
            )}
          </div>
        </header>

        {/* Professional Summary Section */}
        {summary && (
          <section className="mb-6">
            <h2 
              className="text-base font-bold mb-3 uppercase border-b border-gray-600 pb-1"
              style={{ 
                fontSize: isMini ? "10px" : "14px",
                fontWeight: "bold",
                color: "#000000",
                letterSpacing: "0.5px"
              }}
            >
              PROFESSIONAL SUMMARY
            </h2>
            <p 
              className="text-justify leading-relaxed"
              style={{ 
                fontSize: isMini ? "8px" : "12px",
                lineHeight: "1.4",
                color: "#000000"
              }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-base font-bold mb-3 uppercase border-b border-gray-600 pb-1"
              style={{ 
                fontSize: isMini ? "10px" : "14px",
                fontWeight: "bold",
                color: "#000000",
                letterSpacing: "0.5px"
              }}
            >
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 
                        className="font-bold"
                        style={{ 
                          fontSize: isMini ? "9px" : "13px",
                          fontWeight: "bold",
                          color: "#000000"
                        }}
                      >
                        {exp.role || "Position Title"}
                      </h3>
                      <p 
                        className="font-semibold"
                        style={{ 
                          fontSize: isMini ? "8px" : "11px",
                          fontWeight: "600",
                          color: "#333333"
                        }}
                      >
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <span 
                      className="text-right font-medium"
                      style={{ 
                        fontSize: isMini ? "8px" : "11px",
                        color: "#333333"
                      }}
                    >
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p 
                    className="text-justify leading-relaxed"
                    style={{ 
                      fontSize: isMini ? "8px" : "11px",
                      lineHeight: "1.3",
                      color: "#000000"
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-base font-bold mb-3 uppercase border-b border-gray-600 pb-1"
              style={{ 
                fontSize: isMini ? "10px" : "14px",
                fontWeight: "bold",
                color: "#000000",
                letterSpacing: "0.5px"
              }}
            >
              KEY PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 
                      className="font-bold"
                      style={{ 
                        fontSize: isMini ? "9px" : "13px",
                        fontWeight: "bold",
                        color: "#000000"
                      }}
                    >
                      {proj.name || "Project Name"}
                    </h3>
                    <span 
                      className="text-right"
                      style={{ 
                        fontSize: isMini ? "8px" : "10px",
                        color: "#666666",
                        fontStyle: "italic"
                      }}
                    >
                      {proj.technologies?.join(" | ")}
                    </span>
                  </div>
                  <p 
                    className="text-justify leading-relaxed"
                    style={{ 
                      fontSize: isMini ? "8px" : "11px",
                      lineHeight: "1.3",
                      color: "#000000"
                    }}
                  >
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-base font-bold mb-3 uppercase border-b border-gray-600 pb-1"
              style={{ 
                fontSize: isMini ? "10px" : "14px",
                fontWeight: "bold",
                color: "#000000",
                letterSpacing: "0.5px"
              }}
            >
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 
                        className="font-bold"
                        style={{ 
                          fontSize: isMini ? "9px" : "13px",
                          fontWeight: "bold",
                          color: "#000000"
                        }}
                      >
                        {edu.degree || "Degree"}
                      </h3>
                      <p 
                        className="font-semibold"
                        style={{ 
                          fontSize: isMini ? "8px" : "11px",
                          fontWeight: "600",
                          color: "#333333"
                        }}
                      >
                        {edu.institution || "Institution Name"}
                      </p>
                    </div>
                    <span 
                      className="text-right"
                      style={{ 
                        fontSize: isMini ? "8px" : "11px",
                        color: "#333333"
                      }}
                    >
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p 
                      className="text-justify"
                      style={{ 
                        fontSize: isMini ? "8px" : "11px",
                        lineHeight: "1.3",
                        color: "#000000"
                      }}
                    >
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section>
            <h2 
              className="text-base font-bold mb-3 uppercase border-b border-gray-600 pb-1"
              style={{ 
                fontSize: isMini ? "10px" : "14px",
                fontWeight: "bold",
                color: "#000000",
                letterSpacing: "0.5px"
              }}
            >
              CORE COMPETENCIES
            </h2>
            <div 
              className="leading-relaxed"
              style={{ 
                fontSize: isMini ? "8px" : "11px",
                lineHeight: "1.4",
                color: "#000000"
              }}
            >
              {skills.join(" • ")}
            </div>
          </section>
        )}
      </div>
    );
  }
);

export default Preview;

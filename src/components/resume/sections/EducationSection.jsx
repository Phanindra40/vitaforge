import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure this is your configured Axios instance

const EducationSection = ({ data, onChange, onNext, onSave, onBack }) => {
  const [educationList, setEducationList] = useState(data || []);

  useEffect(() => {
    onChange(educationList);
  }, [educationList]);

  const handleChange = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      {
        institute: "",
        course: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  const handleNextClick = async () => {
    try {
      for (const edu of educationList) {
        await axios.post("/educations", {
          data: {
            institute: edu.institute,
            course: edu.course,
            startDate: edu.startDate,
            endDate: edu.endDate,
            description: edu.description,
          },
        });
      }

      onSave(educationList);
      onNext();
    } catch (error) {
      console.error("❌ Error saving education to Strapi:", error);
      alert("Failed to save education. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Education</h2>

      {educationList.map((edu, index) => (
        <div key={index} className="mb-6 border p-5 rounded-xl shadow bg-white">
          <input
            type="text"
            placeholder="Institute Name"
            value={edu.institute}
            onChange={(e) => handleChange(index, "institute", e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3"
          />
          <input
            type="text"
            placeholder="Course / Degree"
            value={edu.course}
            onChange={(e) => handleChange(index, "course", e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
              className="w-full px-4 py-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) => handleChange(index, "endDate", e.target.value)}
              className="w-full px-4 py-2 border rounded mb-3"
            />
          </div>
          <textarea
            placeholder="Description (optional)"
            value={edu.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3"
          />
          <button
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow"
        >
          Back
        </button>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          + Add Education
        </button>

        <button
          onClick={handleNextClick}
          className="bg-green-600 text-white px-6 py-2 rounded shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EducationSection;

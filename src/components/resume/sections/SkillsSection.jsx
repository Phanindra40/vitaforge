import React, { useState, useEffect } from "react";
import axios from "axios";

const SkillsSection = ({ data, onChange, onSave, onBack }) => {
  const [skillsList, setSkillsList] = useState(data || []);

  useEffect(() => {
    onChange(skillsList);
  }, [skillsList]);

  const handleChange = (index, value) => {
    const updated = [...skillsList];
    updated[index] = value;
    setSkillsList(updated);
  };

  const handleAdd = () => {
    setSkillsList([...skillsList, ""]);
  };

  const handleRemove = (index) => {
    const updated = skillsList.filter((_, i) => i !== index);
    setSkillsList(updated);
  };

  const handleSave = async () => {
    try {
      for (const skill of skillsList) {
        await axios.post("/skills", {
          data: { name: skill },
        });
      }
      onSave(skillsList);
      alert("✅ Skills saved successfully!");
    } catch (error) {
      console.error("❌ Failed to save skills:", error);
      alert("Failed to save skills. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Skills</h2>

      {skillsList.map((skill, index) => (
        <div key={index} className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Skill"
            value={skill}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full px-4 py-2 border rounded"
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
          + Add Skill
        </button>

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded shadow"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;

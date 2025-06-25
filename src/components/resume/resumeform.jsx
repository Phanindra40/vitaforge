// /src/pages/addresume/ResumeForm.jsx
import { useState } from "react";

const ResumeForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Resume submitted:", form);
    // Later: Save to DB or local storage
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <textarea
        name="summary"
        placeholder="Professional Summary"
        value={form.summary}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <textarea
        name="skills"
        placeholder="Skills (comma-separated)"
        value={form.skills}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <textarea
        name="experience"
        placeholder="Experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <textarea
        name="education"
        placeholder="Education"
        value={form.education}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Save Resume
      </button>
    </form>
  );
};

export default ResumeForm;

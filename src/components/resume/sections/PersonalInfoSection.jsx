import { motion } from "framer-motion";

const FIELDS = [
  {
    name: "FullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "Email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
  },
  {
    name: "Phone",
    label: "Phone",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    name: "GitHub",
    label: "GitHub",
    type: "url",
    placeholder: "GitHub profile link",
  },
  {
    name: "LinkedIn",
    label: "LinkedIn",
    type: "url",
    placeholder: "LinkedIn profile link",
  },
];

const PersonalInfoSection = ({ personalInfo, setPersonalInfo, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomField = () => {
    setPersonalInfo((prev) => ({
      ...prev,
      customFields: [...(prev.customFields || []), { label: "", value: "" }],
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    const updated = [...(personalInfo.customFields || [])];
    updated[index][field] = value;
    setPersonalInfo((prev) => ({
      ...prev,
      customFields: updated,
    }));
  };

  const handleRemoveCustomField = (index) => {
    const updated = [...(personalInfo.customFields || [])];
    updated.splice(index, 1);
    setPersonalInfo((prev) => ({
      ...prev,
      customFields: updated,
    }));
  };

  const handleNext = () => {
    // resumeId is available here if needed in the future
    onNext(); // just call onNext for now
  };

  return (
    <motion.div
      className="bg-white/90 p-6 md:p-10 rounded-2xl shadow-xl max-w-3xl mx-auto border border-gray-200 mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-gradient bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-8 text-center">
        Personal Information
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {FIELDS.map((field) => (
          <motion.div
            key={field.name}
            className="flex flex-col"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={personalInfo[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              autoComplete="off"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Custom Fields */}
      <div className="mt-10">
        <h3 className="text-lg md:text-xl font-semibold text-purple-600 mb-4 flex items-center gap-2">
          <span>Custom Fields</span>
          <span className="text-xs text-gray-400 font-normal">(optional)</span>
        </h3>

        {(personalInfo.customFields || []).map((field, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row gap-4 mb-4 items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              placeholder="Label"
              value={field.label}
              onChange={(e) =>
                handleCustomFieldChange(index, "label", e.target.value)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) =>
                handleCustomFieldChange(index, "value", e.target.value)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="button"
              onClick={() => handleRemoveCustomField(index)}
              className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded transition"
              title="Remove"
            >
              ✕
            </button>
          </motion.div>
        ))}

        <button
          type="button"
          onClick={handleAddCustomField}
          className="text-sm font-medium text-purple-600 hover:underline mt-1"
        >
          + Add Custom Field
        </button>
      </div>

      <div className="mt-10 flex justify-end">
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PersonalInfoSection;

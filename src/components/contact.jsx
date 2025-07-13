const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full bg-white/90 rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full mt-1 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-bold shadow hover:from-blue-600 hover:to-purple-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full bg-gray-50 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Contact Us</h1>
        <p className="text-gray-600 text-center mb-6">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

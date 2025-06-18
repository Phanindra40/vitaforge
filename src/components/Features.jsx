import React from 'react';
import { Sparkles, Brain, LayoutTemplate, Settings, Stars } from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-8 w-8 text-indigo-600" />,
    title: 'AI-Powered Suggestions',
    desc: 'Let our smart algorithms suggest achievements, job summaries, and skills tailored to your experience.',
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-purple-600" />,
    title: 'Stunning Templates',
    desc: 'Pick from modern, professional, and creative templates designed by hiring experts.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-fuchsia-600" />,
    title: '1-Click Resume Generator',
    desc: 'Instantly generate a complete resume with AI from your basic info or LinkedIn.',
  },
  {
    icon: <Settings className="h-8 w-8 text-teal-600" />,
    title: 'Fully Customizable',
    desc: 'Change layout, color, fonts, and sections. Make it yours in seconds.',
  },
  {
    icon: <Stars className="h-8 w-8 text-yellow-500" />,
    title: 'ATS Optimized',
    desc: 'All our templates are designed to pass Applicant Tracking Systems with ease.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-600">VitaForge?</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-16">
          Empowering job seekers with smart tools to create professional resumes that stand out.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 transition transform hover:-translate-y-1 hover:shadow-2xl group"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-5 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

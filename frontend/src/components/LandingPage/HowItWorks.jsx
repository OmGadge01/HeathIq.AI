import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Activity,
  LineChart,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    icon: <UserCheck className="w-10 h-10 text-indigo-500" />,
    title: "Sign Up & Onboard",
    description:
      "Create your free Heathiq.Ai account and complete a short onboarding to personalize your experience.",
  },
  {
    icon: <Activity className="w-10 h-10 text-indigo-500" />,
    title: "Connect & Analyze",
    description:
      "Link your fitness tracker, health records, and lifestyle data — our AI securely analyzes everything for patterns.",
  },
  {
    icon: <Brain className="w-10 h-10 text-indigo-500" />,
    title: "Get Actionable Insights",
    description:
      "Receive personalized diet, exercise, and wellness insights tailored to your goals and daily habits.",
  },
  {
    icon: <LineChart className="w-10 h-10 text-indigo-500" />,
    title: "Track Progress",
    description:
      "View real-time trends, track performance, and measure improvement through your smart dashboard.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-indigo-500" />,
    title: "Stay Secure",
    description:
      "Your data is encrypted, private, and completely under your control. Heathiq.Ai prioritizes your security.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-700/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          How <span className="text-indigo-400">Heathiq.Ai</span> Works
        </motion.h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-16 text-lg">
          From onboarding to personalized insights — here’s how our AI-powered
          system transforms your health journey.
        </p>

        {/* Steps Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex flex-col items-center text-center space-y-5"
            >
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
              <div className="mt-3 text-sm font-medium text-indigo-400 tracking-wide">
                STEP {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-16 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
    </section>
  );
};

export default HowItWorks;

import React, { useState } from "react";
import { motion } from "framer-motion";
// import { Button } from "../../components/ui/button"; // or just use <button> if this causes issues
import { HeartPulse, User, Weight, Calendar, Dumbbell, Activity } from "lucide-react";

const FitnessProfileForm = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    frequency: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.age || isNaN(Number(formData.age))) newErrors.age = "Valid age is required";
    if (!formData.frequency) newErrors.frequency = "Select frequency";
    if (!formData.type) newErrors.type = "Select type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted!");
      // handle form data
    }
  };

  return (
    <div className="min-h-screen  bg-blue-900 flex flex-col items-center justify-center p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold">Fitness Journey Starts Here</h1>
        <p className="mt-2 text-lg text-blue-100">
          Tell us about yourself and let's create a personalized fitness plan that works for you
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-xl bg-white text-black rounded-2xl shadow-xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <HeartPulse className="text-blue-700 w-10 h-10 mb-2" />
          <h2 className="text-2xl font-semibold text-blue-800">Your Fitness Profile</h2>
          <p className="text-sm text-gray-500">Share your details to get personalized recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Height */}
          <div>
            <label className="block text-blue-800 font-medium mb-1 flex items-center gap-1">
              <User className="w-4 h-4" /> Height <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="height"
              placeholder="e.g., 5'8 or 173cm"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-blue-800 font-medium mb-1 flex items-center gap-1">
              <Weight className="w-4 h-4" /> Weight <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="weight"
              placeholder="e.g., 150 lbs or 68 kg"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-blue-800 font-medium mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Exercise Frequency */}
          <div>
            <label className="block text-blue-800 font-medium mb-1 flex items-center gap-1">
              <Activity className="w-4 h-4" /> Exercise Frequency <span className="text-red-500">*</span>
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">How often do you exercise?</option>
              <option value="None">None</option>
              <option value="1-2x">1–2x / week</option>
              <option value="3-5x">3–5x / week</option>
              <option value="6+x">6+ / week</option>
            </select>
            {errors.frequency && <p className="text-red-500 text-sm">{errors.frequency}</p>}
          </div>

          {/* Exercise Type */}
          <div>
            <label className="block text-blue-800 font-medium mb-1 flex items-center gap-1">
              <Dumbbell className="w-4 h-4" /> Exercise Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">What type of exercise do you prefer?</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Yoga">Yoga</option>
              <option value="Mixed">Mixed</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800 transition-all"
          >
            Create My Fitness Profile
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FitnessProfileForm;

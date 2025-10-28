import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  CakeIcon,
  MapPinIcon,
  HeartIcon,
  FireIcon,
  SunIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const HealthForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    mealType: "",
    dailyMeals: "",
    snacksFrequency: "",
    sugarIntake: "",
    location: "",
    sleep: 7,
    exerciseFrequency: "",
    exerciseType: "",
    waterIntake: "",
    allergies: "",
    alcohol: "",
    smoking: false,
    stress: 5,
  });

  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    "Personal Information",
    "Physical Stats",
    "Lifestyle & Habits",
  ];

  const handleChange = (field, value) => {
    const numericFields = [
      "age",
      "height",
      "weight",
      "dailyMeals",
      "sleep",
      "waterIntake",
      "stress",
    ];
    if (numericFields.includes(field)) value = Number(value);
    setForm({ ...form, [field]: value });
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = "";
    if (["name", "email", "gender", "mealType"].includes(field) && !value)
      error = "This field is required";
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Invalid email address";
    }
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async () => {
    if (Object.values(errors).some((err) => err)) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        // ✅ Save userId to localStorage for later use (recommendation)
        if (data.user && data.user._id) {
          localStorage.setItem("userId", data.user._id);
          console.log("User ID saved:", data.user._id);
        } else {
          console.warn("User ID not found in response:", data);
        }

        // ✅ Reset form and navigate
        setForm({
          name: "",
          email: "",
          age: "",
          gender: "",
          height: "",
          weight: "",
          mealType: "",
          dailyMeals: "",
          snacksFrequency: "",
          sugarIntake: "",
          location: "",
          sleep: 7,
          exerciseFrequency: "",
          exerciseType: "",
          waterIntake: "",
          allergies: "",
          alcohol: "",
          smoking: false,
          stress: 5,
        });
        setErrors({});
        navigate("/dashboard");
      } else {
        console.error("Error saving user:", data);
        alert("Error saving user: " + (data.error || data.message));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form");
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);
  };

  const prevSection = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white text-center">
          <h1 className="text-4xl font-extrabold mb-2">
            🏥 Health & Wellness Survey
          </h1>
          <p className="text-lg opacity-90">Let's build a healthier you!</p>
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-4 bg-gray-100">
          <div className="flex justify-between items-center mb-2">
            {sections.map((section, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentSection
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index < currentSection ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < sections.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      index < currentSection ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 font-medium">
            {sections[currentSection]}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="p-8 space-y-8">
          {/* Personal Info */}
          {currentSection === 0 && (
            <section className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="relative group">
                  <UserIcon className="w-5 h-5 absolute top-3 left-3 text-blue-400 group-hover:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Name *"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full pl-10 p-4 rounded-xl border-2 ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-300 group-hover:border-blue-400"
                    } focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-300`}
                  />
                  {errors.name && (
                    <p className="text-red-500 mt-2 text-sm">{errors.name}</p>
                  )}
                </div>
                {/* Email */}
                <div className="relative group">
                  <EnvelopeIcon className="w-5 h-5 absolute top-3 left-3 text-blue-400 group-hover:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full pl-10 p-4 rounded-xl border-2 ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 group-hover:border-blue-400"
                    } focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-300`}
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-2 text-sm">{errors.email}</p>
                  )}
                </div>
                {/* Age */}
                <div className="relative group">
                  <CakeIcon className="w-5 h-5 absolute top-3 left-3 text-green-400 group-hover:text-green-600 transition-colors" />
                  <input
                    type="number"
                    placeholder="Age *"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:outline-none group-hover:border-green-400 transition-all duration-300"
                  />
                </div>
                {/* Gender */}
                <div className="relative group">
                  <ChevronDownIcon className="w-5 h-5 absolute top-3 right-3 text-green-400 group-hover:text-green-600 transition-colors" />
                  <select
                    value={form.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:outline-none group-hover:border-green-400 transition-all duration-300"
                  >
                    <option value="">Gender *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Physical Stats */}
          {currentSection === 1 && (
            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height */}
              <div className="relative group">
                <SunIcon className="w-5 h-5 absolute top-3 left-3 text-green-400 group-hover:text-green-600 transition-colors" />
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={form.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:outline-none group-hover:border-green-400 transition-all duration-300"
                />
              </div>
              {/* Weight */}
              <div className="relative group">
                <HeartIcon className="w-5 h-5 absolute top-3 left-3 text-green-400 group-hover:text-green-600 transition-colors" />
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:outline-none group-hover:border-green-400 transition-all duration-300"
                />
              </div>
            </section>
          )}

          {/* Lifestyle & Habits */}
          {currentSection === 2 && (
            <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Meal Type */}
              <div className="relative group">
                <FireIcon className="w-5 h-5 absolute top-3 left-3 text-yellow-400 group-hover:text-yellow-600 transition-colors" />
                <select
                  value={form.mealType}
                  onChange={(e) => handleChange("mealType", e.target.value)}
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:outline-none group-hover:border-yellow-400 transition-all duration-300"
                >
                  <option value="">Meal Type *</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
              {/* Meals per day */}
              <div className="relative group">
                <BeakerIcon className="w-5 h-5 absolute top-3 left-3 text-yellow-400 group-hover:text-yellow-600 transition-colors" />
                <input
                  type="number"
                  placeholder="Meals per Day"
                  value={form.dailyMeals}
                  onChange={(e) => handleChange("dailyMeals", e.target.value)}
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:outline-none group-hover:border-yellow-400 transition-all duration-300"
                />
              </div>
              {/* Snacks Frequency */}
              <div className="relative group">
                <ExclamationTriangleIcon className="w-5 h-5 absolute top-3 left-3 text-yellow-400 group-hover:text-yellow-600 transition-colors" />
                <select
                  value={form.snacksFrequency}
                  onChange={(e) =>
                    handleChange("snacksFrequency", e.target.value)
                  }
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:outline-none group-hover:border-yellow-400 transition-all duration-300"
                >
                  <option value="">Snacking Frequency</option>
                  <option value="Rarely">Rarely</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Often">Often</option>
                </select>
              </div>
              {/* Sugar Intake */}
              <div className="relative group">
                <BeakerIcon className="w-5 h-5 absolute top-3 left-3 text-yellow-400 group-hover:text-yellow-600 transition-colors" />
                <select
                  value={form.sugarIntake}
                  onChange={(e) => handleChange("sugarIntake", e.target.value)}
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:outline-none group-hover:border-yellow-400 transition-all duration-300"
                >
                  <option value="">Sugar Intake</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              {/* Location */}
              <div className="relative group md:col-span-2">
                <MapPinIcon className="w-5 h-5 absolute top-3 left-3 text-yellow-400 group-hover:text-yellow-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full pl-10 p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:outline-none group-hover:border-yellow-400 transition-all duration-300"
                />
              </div>
              {/* Sleep Slider */}
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-3 text-gray-700 font-semibold">
                  Sleep Duration (hrs)
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={form.sleep}
                  onChange={(e) => handleChange("sleep", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center mt-3 text-lg font-bold text-gray-800">
                  {form.sleep} hrs{" "}
                  {form.sleep < 6 ? "😴" : form.sleep < 8 ? "😐" : "😊"}
                </div>
              </div>
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t mt-8">
            {currentSection > 0 && (
              <button
                type="button"
                onClick={prevSection}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-400 transition duration-300"
              >
                Previous
              </button>
            )}
            {currentSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={nextSection}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-600 transition duration-300 ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-xl hover:from-green-500 hover:to-green-600 transition duration-300 ml-auto"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(20px);}
          to { opacity:1; transform:translateY(0);}
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default HealthForm;

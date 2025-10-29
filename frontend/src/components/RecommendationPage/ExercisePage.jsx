import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const ExercisePage = () => {
  const [exerciseText, setExerciseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = async (category) => {
    setSelectedCard(category);
    setIsLoading(true);

    try {
      const res = await fetch("https://heathiq-ai.onrender.com/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "exercise", category }),
      });

      const data = await res.json();
      let text = data.exercise || "No response from AI.";

      // 🧹 Clean messy AI text
      text = text
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, " ")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/```/g, "")
        .replace(/recommendation\s*by\s*HealthIQ\.AI[:\-]*/gi, "")
        .trim();

      setExerciseText(text);
    } catch (err) {
      console.error("Error fetching AI data:", err);
      setExerciseText("Failed to fetch AI response. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const cards = [
    {
      title: "Weight Loss",
      desc: "AI-tailored workouts to burn fat and build stamina effectively.",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Muscle Gain",
      desc: "Structured strength training to enhance muscle mass safely.",
      color: "bg-green-50 hover:bg-green-100",
    },
    {
      title: "Flexibility",
      desc: "Daily stretching and yoga-based routines for body agility.",
      color: "bg-yellow-50 hover:bg-yellow-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-blue-950 mb-6 text-center">
        Exercise Recommendations
      </h1>

      {/* --- Exercise Category Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(card.title)}
            className={`rounded-2xl p-6 shadow-md cursor-pointer transition-transform transform hover:scale-105 ${card.color}`}
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-700">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* --- AI Recommendation Output --- */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {isLoading ? (
          <div className="text-center text-blue-900 font-semibold animate-pulse">
            Fetching your personalized exercise plan...
          </div>
        ) : exerciseText ? (
          <>
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              {selectedCard} — AI Recommendation
            </h2>
            <ReactMarkdown className="prose prose-blue max-w-none text-gray-800">
              {exerciseText}
            </ReactMarkdown>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Select a category above to see your AI-powered recommendation.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;

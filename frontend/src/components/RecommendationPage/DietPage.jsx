import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const DietCard = ({ title, description, color, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-2xl p-6 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${color}`}
  >
    <h3 className="text-xl font-semibold text-blue-950 mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const SectionBlock = ({ title, subtitle, cards, onCardClick }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-2xl font-bold mb-1 text-gray-800">{title}</h2>
    <p className="text-gray-500 mb-5">{subtitle}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <DietCard key={i} {...card} onClick={() => onCardClick(card.title)} />
      ))}
    </div>
  </div>
);

const DietPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [dietText, setDietText] = useState("");
  const [loading, setLoading] = useState(false);

  const dietCards = [
    {
      title: "Nutrition Focus",
      description: "Choose foods that fuel your body and mind for peak performance.",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Meal Timing",
      description: "Structure your meals to support energy, digestion, and recovery.",
      color: "bg-pink-50 hover:bg-pink-100",
    },
    {
      title: "Hydration",
      description: "Stay energized and balanced with optimal water intake daily.",
      color: "bg-yellow-50 hover:bg-yellow-100",
    },
    {
      title: "Healthy Habits",
      description: "Build consistent routines to support long-term nutrition goals.",
      color: "bg-green-50 hover:bg-green-100",
    },
  ];

  const handleCardClick = async (title) => {
    setSelectedCard(title);
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      let text = data.diet || "No response from AI.";

      
      text = text
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, " ")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/```/g, "")
        .trim();

      setDietText(text);
    } catch (err) {
      console.error("Error fetching diet recommendation:", err);
      setDietText("⚠️ Error fetching recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-950 font-sans">
            Personalized Diet Recommendations
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Smart nutrition insights designed to fuel your goals and lifestyle.
          </p>
        </div>

        {/* Card Section */}
        <SectionBlock
          title="Choose Your Focus"
          subtitle="Select the area you'd like to improve — our AI will create a tailored plan."
          cards={dietCards}
          onCardClick={handleCardClick}
        />

        {/* AI Response Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
          {loading ? (
            <div className="text-center text-blue-900 font-semibold animate-pulse">
              Fetching your personalized diet plan...
            </div>
          ) : dietText ? (
            <>
              <h2 className="text-xl font-bold text-blue-950 mb-4">
                {selectedCard} — AI Recommendation
              </h2>
              <ReactMarkdown className="prose prose-blue max-w-none text-gray-800">
                {dietText}
              </ReactMarkdown>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Select a focus above to see your AI-powered diet recommendation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPage;

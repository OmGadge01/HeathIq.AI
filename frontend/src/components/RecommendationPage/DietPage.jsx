import React, { useState, useEffect, useRef } from "react";

const DietCard = ({ title, description, color, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-xl p-5 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${color} relative min-h-[140px]`}
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

const SectionBlock = ({ title, subtitle, cards, onCardClick }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold mb-1 text-gray-800">{title}</h2>
    <p className="text-gray-500 mb-5">{subtitle}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <DietCard key={i} {...card} onClick={() => onCardClick(card.title)} />
      ))}
    </div>
  </div>
);

const DietPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [aiResponse, setAiResponse] = useState({ dietLines: [] });
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const notesRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const dietCards = [
    {
      title: "Nutrition Focus",
      description: "Choose foods that fuel your body and mind for peak performance.",
      color: "bg-blue-100",
    },
    {
      title: "Meal Timing",
      description: "Structure your meals to support energy, digestion, and recovery.",
      color: "bg-pink-100",
    },
    {
      title: "Hydration",
      description: "Stay energized and balanced with optimal water intake daily.",
      color: "bg-yellow-100",
    },
    {
      title: "Healthy Habits",
      description: "Build consistent routines to support long-term nutrition goals.",
      color: "bg-gray-100",
    },
  ];

  const handleCardClick = async (title) => {
    setSelectedCard(title);
    setCompletedLines([]);
    setCurrentLine("");
    setLineIndex(0);
    setCharIndex(0);
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch recommendation");
      }

      const data = await res.json();
      let dietText = typeof data.diet === "string" ? data.diet : JSON.stringify(data.diet);

      // Clean text: remove unwanted characters and emojis
      dietText = dietText
        .replace(/[\{\}\[\]<>\/\"json"\\]/g, "")
        // .replace(/🍽️|🕒|💧|"json"|🌿/g, "");

      const dietLines = dietText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      setAiResponse({ dietLines });
    } catch (err) {
      console.error("Failed to fetch AI recommendation:", err);
      setAiResponse({ dietLines: ["⚠️ Error fetching recommendation. Please try again."] });
    } finally {
      setLoading(false);
      setTimeout(() => notesRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (!selectedCard || aiResponse.dietLines.length === 0) return;
    if (lineIndex >= aiResponse.dietLines.length) return;

    const fullLine = aiResponse.dietLines[lineIndex];
    const timer = setTimeout(() => {
      if (charIndex < fullLine.length) {
        setCurrentLine((prev) => prev + fullLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setCompletedLines((prev) => [...prev, fullLine]);
        setCurrentLine("");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }
    }, 25);

    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, selectedCard, aiResponse]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 font-sans">
            Your Personalized Diet Plan
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Fuel your body with strategies that match your wellness goals.
          </p>
        </div>

        {/* Card Section */}
        <SectionBlock
          title="Diet Plan"
          subtitle="Tailored nutritional strategies to help you meet your goals."
          cards={dietCards}
          onCardClick={handleCardClick}
        />

        {/* AI Recommendation Section */}
        {selectedCard && (
          <div
            ref={notesRef}
            className="bg-white p-6 mt-10 rounded-xl shadow-md border border-gray-200 prose prose-sm max-w-none"
          >
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              Recommendation by HealthIQ.AI: {selectedCard}
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading recommendation...</p>
            ) : (
              <>
                {completedLines.map((line, index) => (
                  <p key={index} className="mb-2">
                    {line.startsWith("**") ? (
                      <strong>{line.replace(/\*\*/g, "")}</strong>
                    ) : (
                      line
                    )}
                  </p>
                ))}
                {currentLine && <p>{currentLine}</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPage;
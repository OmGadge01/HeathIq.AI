import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const ExerciseCard = ({ title, description, color, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-xl p-5 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${color} relative min-h-[140px]`}
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

const SectionBlock = ({ title, subtitle, cards, onCardClick }) => (
  <div className="bg-[#eaf2ff] p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold mb-1 text-blue-900">{title}</h2>
    <p className="text-gray-700 mb-5">{subtitle}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <ExerciseCard key={i} {...card} onClick={() => onCardClick(card.title)} />
      ))}
    </div>
  </div>
);

const ExercisePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [aiResponse, setAiResponse] = useState({ exerciseLines: [] });
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const notesRef = useRef(null);

  const exerciseCards = [
    { title: "Training Structure", description: "Plan your strength and cardio sessions.", color: "bg-green-100" },
    { title: "Rest & Recovery", description: "Optimize recovery and sleep quality.", color: "bg-red-100" },
    { title: "Cardio Routine", description: "Boost stamina with targeted cardio plans.", color: "bg-yellow-100" },
    { title: "Form & Function", description: "Maintain proper form and avoid injuries.", color: "bg-gray-100" },
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

      if (!res.ok) throw new Error("Failed to fetch recommendation");

      const data = await res.json();
      let exerciseText = typeof data.exercise === "string" ? data.exercise : JSON.stringify(data.exercise);

      // Clean messy Gemini text
      exerciseText = exerciseText
        .replace(/[\{\}\[\]<>\"\\]/g, "")
        .replace(/\\n|n/g, "\n")
        .replace(/\*\*/g, "")
        .replace(/#+/g, "");

      const allLines = exerciseText.split("\n").map((l) => l.trim()).filter(Boolean);
      setAiResponse({ exerciseLines: allLines });
    } catch (err) {
      console.error(err);
      setAiResponse({ exerciseLines: ["⚠️ Error fetching exercise plan."] });
    } finally {
      setLoading(false);
      setTimeout(() => notesRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  };

  // Typing animation effect
  useEffect(() => {
    if (!selectedCard || aiResponse.exerciseLines.length === 0) return;
    if (lineIndex >= aiResponse.exerciseLines.length) return;

    const fullLine = aiResponse.exerciseLines[lineIndex];
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
    }, 20);

    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, aiResponse, selectedCard]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 font-sans">
            Your Personalized Exercise Plan
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Smart workouts designed to enhance strength, stamina, and recovery.
          </p>
        </div>

        <SectionBlock
          title="Exercise Plan"
          subtitle="AI-personalized training recommendations for your goals."
          cards={exerciseCards}
          onCardClick={handleCardClick}
        />

        {selectedCard && (
          <div
            ref={notesRef}
            className="bg-white p-6 mt-10 rounded-xl shadow-md border border-gray-200 prose prose-sm max-w-none"
          >
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              Recommendation by HealthIQ.AI: {selectedCard}
            </h2>

            {loading && <p className="text-gray-500">Loading recommendation...</p>}

            {completedLines.map((line, i) => (
              <p key={i} className="text-gray-800 mb-2">{line}</p>
            ))}

            {currentLine && <p className="text-gray-800">{currentLine}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;

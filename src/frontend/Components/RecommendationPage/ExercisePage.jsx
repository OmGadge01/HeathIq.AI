import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

// Reusable Card Component
const ExerciseCard = ({ title, description, color, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-xl p-5 shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer ${color} relative min-h-[140px]`}
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-700">{description}</p>
  </div>
);

// Section Block
const SectionBlock = ({ title, subtitle, cards, onCardClick }) => (
  <div className="bg-[#597ea8] p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold mb-1 text-black">{title}</h2>
    <p className="text-gray-100 mb-5">{subtitle}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <ExerciseCard key={i} {...card} onClick={() => onCardClick(card.title)} />
      ))}
    </div>
  </div>
);

const ExercisePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [aiResponse, setAiResponse] = useState({});
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const notesRef = useRef(null);

  // Example exercise cards and descriptions
  const exerciseCards = [
    { title: "Training Structure 🏋️‍♀️", description: "Plan your week with structured strength & cardio.", color: "bg-green-100" },
    { title: "Rest & Recovery 😴", description: "Recover efficiently with sleep and active rest.", color: "bg-red-100" },
    { title: "Cardio Routine 🚴", description: "Boost stamina and endurance with cardio plans.", color: "bg-yellow-100" },
    { title: "Form & Function 🎯", description: "Maintain posture and form for safe exercise.", color: "bg-gray-100" },
  ];

  // Static note data for now; later can be replaced with API response
  const noteData = {
    "Training Structure 🏋️‍♀️": [
      "**Consult a Trainer:** Seek expert advice for proper form and structure.",
      "**Plan Your Week:** Mix cardio, strength, and rest strategically.",
      "**Monitor Progress:** Use logs or apps to track growth and endurance.",
    ],
    "Rest & Recovery 😴": [
      "**Sleep Matters:** Aim for 7–9 hours of quality sleep.",
      "**Active Recovery:** Try yoga, walking, or foam rolling.",
      "**Avoid Overtraining:** Take breaks to prevent burnout or injury.",
    ],
    "Cardio Routine 🚴": [
      "**Start Easy:** Gradually increase pace and time.",
      "**Mix It Up:** Alternate between HIIT and steady-state.",
      "**Track Heart Rate:** Use wearables or apps to stay in range.",
    ],
    "Form & Function 🎯": [
      "**Use Mirrors:** Check posture and alignment.",
      "**Go Slow:** Quality reps > quantity.",
      "**Warm Up:** Always prepare your body for movement.",
    ],
  };

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
    setCompletedLines([]);
    setCurrentLine("");
    setLineIndex(0);
    setCharIndex(0);
    setTimeout(() => notesRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  // Typing animation effect
  useEffect(() => {
    if (!selectedCard) return;

    // Match section (ignore emojis and spaces)
    const matchedKey = Object.keys(noteData).find((key) =>
      key.toLowerCase().includes(selectedCard.replace(/[\u{1F300}-\u{1F6FF}]/gu, "").trim().toLowerCase())
    );

    const lines = matchedKey ? noteData[matchedKey] : ["No recommendation available for this section."];

    if (lineIndex >= lines.length) return;

    const currentFullLine = lines[lineIndex];

    const timer = setTimeout(() => {
      if (charIndex < currentFullLine.length) {
        setCurrentLine((prev) => prev + currentFullLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setCompletedLines((prev) => [...prev, currentFullLine]);
        setCurrentLine("");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, selectedCard, noteData]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 font-sans">
            Your Personalized Exercise Plan
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Smart, efficient workouts designed for performance and recovery.
          </p>
        </div>

        {/* Cards Section */}
        <SectionBlock title="Exercise Plan" subtitle="Improve strength, mobility, and endurance with your custom routine." cards={exerciseCards} onCardClick={handleCardClick} />

        {/* Notes Section */}
        {selectedCard && (
          <div ref={notesRef} className="bg-white rounded-xl p-6 shadow-md mt-10 border border-gray-200 prose max-w-none">
            <h2 className="text-xl font-bold text-blue-950 mb-4">{selectedCard} – Detailed Notes</h2>
            {completedLines.map((line, i) => (
              <ReactMarkdown key={i}>{line}</ReactMarkdown>
            ))}
            {currentLine && <ReactMarkdown>{currentLine}</ReactMarkdown>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;

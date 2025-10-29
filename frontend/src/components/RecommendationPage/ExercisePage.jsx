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
  const [aiResponse, setAiResponse] = useState({ exerciseLines: [] });
  const [completedLines, setCompletedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const notesRef = useRef(null);

  const exerciseCards = [
    { title: "Training Structure", description: "Plan your week with structured strength & cardio.", color: "bg-green-100" },
    { title: "Rest & Recovery", description: "Recover efficiently with sleep and active rest.", color: "bg-red-100" },
    { title: "Cardio Routine", description: "Boost stamina and endurance with cardio plans.", color: "bg-yellow-100" },
    { title: "Form & Function", description: "Maintain posture and form for safe exercise.", color: "bg-gray-100" },
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

      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_BASE}/api/recommendation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to fetch recommendation");
      }

      const data = await res.json();

      
      let exerciseText =
        typeof data.exercise === "string" ? data.exercise : JSON.stringify(data.exercise);

      
      exerciseText = exerciseText
        .replace(/[\{\}\"\'\[\]<>\"\"json"\/\\]/g, "")
        // .replace(/🏋️‍♀️|😴|🚴|🎯/g, "")
        .replace(/\\n|n/g, "\n");

      
      const allLines = exerciseText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

 
      const cardLines = allLines.filter((line) =>
        line.toLowerCase().includes(title.toLowerCase())
      );

      setAiResponse({
        exerciseLines: cardLines.length > 0 ? cardLines : ["No recommendation available for this section."],
      });
    } catch (err) {
      console.error("Failed to fetch AI recommendation:", err);
      setAiResponse({ exerciseLines: ["Error fetching recommendation."] });
    } finally {
      setLoading(false);
      setTimeout(() => notesRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  };

  
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
  }, [charIndex, lineIndex, selectedCard, aiResponse]);

  
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

        {/* Exercise Section */}
        <SectionBlock
          title="Exercise Plan"
          subtitle="Improve strength, mobility, and endurance with your custom routine."
          cards={exerciseCards}
          onCardClick={handleCardClick}
        />

        {/* AI Notes Section */}
        {selectedCard && (
          <div
            ref={notesRef}
            className="bg-white rounded-xl p-6 shadow-md mt-10 border border-gray-200 prose prose-sm max-w-none"
          >
            <h2 className="text-xl font-bold text-blue-950 mb-4">
              Recommendation By HealthIQ.AI: {selectedCard}
            </h2>

            {loading && <p className="text-gray-500">Loading recommendation...</p>}

            {completedLines.map((line, index) => (
              <ReactMarkdown
                key={index}
                className="prose prose-sm text-gray-800 mb-3"
                components={{
                  h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-semibold text-blue-800 mt-4 mb-2" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="text-gray-900 font-bold" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc ml-6 space-y-1" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                }}
              >
                {line.replace(/\\n|n/g, "\n")}
              </ReactMarkdown>
            ))}

            {currentLine && (
              <ReactMarkdown className="prose prose-sm text-gray-800">
                {currentLine.replace(/\\n|n/g, "\n")}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;

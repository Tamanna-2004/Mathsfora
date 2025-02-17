import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TimeTravelPuzzle.css";

const eras = [
  { year: "300 BC", event: "The foundation of Euclidean geometry", correctEra: "Ancient Greece" },
  { year: "1687", event: "Newton publishes Principia Mathematica", correctEra: "Scientific Revolution" },
  { year: "1943", event: "Development of the first electronic computer", correctEra: "Modern Era" },
];

const TimeTravelPuzzle = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [score, setScore] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [draggedEra, setDraggedEra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleDrop = (era) => {
    if (era === eras[currentEventIndex].correctEra) {
      setScore(score + 1);
    }
    if (currentEventIndex < eras.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      alert(`Game Over! Your final score: ${score + 1}/${eras.length}`);
      setCurrentEventIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="puzzle-container">
      <h2>Time Travel Puzzle</h2>
      <p>Drag and drop the event into the correct historical era!</p>
      <div className="event-box">{eras[currentEventIndex].event} ({eras[currentEventIndex].year})</div>
      <div className="dropzones">
        {["Ancient Greece", "Scientific Revolution", "Modern Era"].map((era) => (
          <div
            key={era}
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(era)}
          >
            {era}
          </div>
        ))}
      </div>
      <div className="draggable" draggable onDragStart={() => setDraggedEra(eras[currentEventIndex].correctEra)}>
        Drag Me!
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default TimeTravelPuzzle;

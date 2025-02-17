import { useState } from "react";
import "./FormulaBuilder.css";

const formulas = [
  { hint: "Area of Circle", options: ["2πr", "πr²", "πd", "r²/π"], answer: "πr²" },
  { hint: "Pythagorean Theorem", options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "ab = c²"], answer: "a² + b² = c²" },
  { hint: "Quadratic Formula", options: ["x = (-b ± √(b²-4ac))/2a", "x = (-b + 2√ac)/a", "x = (b ± √(4ac-b²))/2a", "x = (-b ± √(b²+4ac))/2a"], answer: "x = (-b ± √(b²-4ac))/2a" },
  { hint: "Circumference of a Circle", options: ["πr²", "2πr", "πd", "r²/π"], answer: "2πr" },
  { hint: "Euler’s Formula", options: ["e^(iπ) + 1 = 0", "a² + b² = c²", "x = -b/a", "sin²θ + cos²θ = 1"], answer: "e^(iπ) + 1 = 0" },
  { hint: "Newton’s Second Law", options: ["F = ma", "E = mc²", "P = IV", "V = IR"], answer: "F = ma" },
  { hint: "Einstein’s Energy Equation", options: ["E = mc²", "E = hf", "P = IV", "V = IR"], answer: "E = mc²" },
];

function FormulaBuilder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false); // ✅ Prevent multiple correct answers

  const handleAnswer = (option) => {
    if (answered) return; // ✅ Prevent answering again once correct

    if (option === formulas[currentIndex].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      setAnswered(true);

      setTimeout(() => {
        setFeedback("");
        setCurrentIndex((prev) => (prev + 1) % formulas.length);
        setAttempts(0);
        setAnswered(false);
      }, 1500);
    } else {
      setFeedback("❌ Incorrect! Try again.");
      setAttempts(attempts + 1);
    }
  };

  return (
    <div className="formulaCont">
    <div className="bot_container">
      <h1>🧮 Formula Quiz Game</h1>
      <p className="score">🏆 Score: {score}</p>
      <div className="quiz-box">
        <h2 className="hint">💡 Hint: {formulas[currentIndex].hint}</h2>
        <div className="options">
          {formulas[currentIndex].options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answered && option === formulas[currentIndex].answer ? "correct" : ""}`}
              onClick={() => handleAnswer(option)}
              disabled={answered} // ✅ Disable buttons after correct answer
            >
              {option}
            </button>
          ))}
        </div>
        <p className={`feedback ${feedback.includes("Correct") ? "correct" : "wrong"}`}>{feedback}</p>
        <p className="attempts">🔄 Attempts: {attempts}</p>
      </div>
    </div>
    </div>
  );
}

export default FormulaBuilder;

import React, { useState } from "react";
import "./MathGame.css";

const questions = [
  { id: 1, question: "Find the area of a rectangle with length 10m and width 5m.", formula: "Formula: Area = length × width", answer: 50 },
  { id: 2, question: "A car travels 120 km in 3 hours. What is its speed?", formula: "Formula: Speed = Distance ÷ Time", answer: 40 },
  { id: 3, question: "Find the perimeter of a square with side 7m.", formula: "Formula: Perimeter = 4 × side", answer: 28 },
  { id: 4, question: "Solve for x: 3x + 7 = 16", formula: "Formula: Solve for x", answer: 3 },
  { id: 5, question: "A train moves at 90 km/h for 2 hours. Find the distance.", formula: "Formula: Distance = Speed × Time", answer: 180 },
  { id: 6, question: "Find the area of a circle with radius 7m (π = 3.14).", formula: "Formula: Area = π × r²", answer: 153.86 },
  { id: 7, question: "Find the hypotenuse of a right triangle with sides 6m and 8m.", formula: "Formula: c² = a² + b²", answer: 10 },
  { id: 8, question: "A person walks 5 km north and then 12 km east. Find the shortest distance back.", formula: "Formula: Distance = √(a² + b²)", answer: 13 },
  { id: 9, question: "What is 15% of 200?", formula: "Formula: (Percentage ÷ 100) × Total", answer: 30 },
  { id: 10, question: "Find the probability of rolling a 6 on a fair die.", formula: "Formula: P(Event) = Favorable Outcomes / Total Outcomes", answer: 1/6 },
  { id: 11, question: "A shop sells a ₹1200 item at 20% discount. What is the final price?", formula: "Formula: Price = Original - Discount", answer: 960 },
  { id: 12, question: "Find the sum of the first 5 positive integers.", formula: "Formula: Sum = n(n+1)/2", answer: 15 },
  { id: 13, question: "Convert 0.75 to a percentage.", formula: "Formula: Percentage = Decimal × 100", answer: 75 },
  { id: 14, question: "Find the missing angle in a triangle with angles 45° and 65°.", formula: "Formula: Sum of Angles = 180°", answer: 70 },
  { id: 15, question: "What is the square root of 144?", formula: "Formula: √n", answer: 12 },
  { id: 16, question: "Find the LCM of 4 and 6.", formula: "Formula: LCM = Lowest Common Multiple", answer: 12 },
  { id: 17, question: "Find the HCF of 18 and 24.", formula: "Formula: HCF = Highest Common Factor", answer: 6 },
  { id: 18, question: "A number is tripled and increased by 5 to get 23. Find the number.", formula: "Formula: 3x + 5 = 23", answer: 6 },
  { id: 19, question: "A worker earns ₹450 per day. How much for 8 days?", formula: "Formula: Wage = Daily Wage × Days", answer: 3600 },
  { id: 20, question: "A train covers 240 km in 3 hours. Find its average speed.", formula: "Formula: Speed = Distance ÷ Time", answer: 80 },
];

function MathGame() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[Math.floor(Math.random() * questions.length)]);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    const parsedAnswer = parseFloat(userAnswer);
    if (parsedAnswer === currentQuestion.answer) {
      setFeedback("✅ Correct!");
      setScore(score + 1);
    } else {
      setFeedback("❌ Incorrect. Try again!");
    }
    setTimeout(() => {
      setUserAnswer("");
      setFeedback("");
      setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    }, 1500);
  };

  return (
    <div className="gameCont">
    <div className="game-container">
      <h1>Math Challenge 🎯</h1>
      <p className="question">{currentQuestion.question}</p>
      <p className="formula">{currentQuestion.formula}</p>

      <input
        type="number"
        placeholder="Enter your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      <button onClick={checkAnswer} className="submitButton">Submit</button>

      {feedback && <p className={`feedback ${feedback.includes("Correct") ? "correct" : "incorrect"}`}>{feedback}</p>}
      <p className="score">Score: {score}</p>
    </div>
    </div>
  );
}

export default MathGame;

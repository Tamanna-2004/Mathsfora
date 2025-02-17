import React, { useEffect, useState } from "react";
import "./GuessTheMathematician.css";

const mathematicians = [
  {
    name: "Ramanujan",
    clue: "Known for his self-taught genius and infinite series.",
    image: "https://i.imgur.com/j30V5wV.jpeg",
    description: "Srinivasa Ramanujan was an Indian mathematician who made extraordinary contributions to mathematical analysis, number theory, and continued fractions. His work still influences mathematics today."
  },
  {
    name: "Euler",
    clue: "Introduced the famous formula e^(iπ) + 1 = 0.",
    image: "https://i.imgur.com/CToQcuk.jpeg",
    description: "Leonhard Euler was a Swiss mathematician and physicist who made pioneering contributions in topology, graph theory, and calculus. His work laid the foundation for much of modern mathematics."
  },

  {
    name: "Gauss",
    clue: "A child prodigy who amazed his teacher by summing numbers from 1 to 100 instantly. Known for his contributions to number theory, statistics, and the normal distribution curve.",
    image: "https://i.imgur.com/3jlHi56.png",
    description: "The Prince of Mathematicians, Gauss made significant contributions to number theory, algebra, statistics, and mathematical physics. His work on the normal distribution (bell curve) and the fundamental theorem of algebra changed the landscape of mathematics forever.",
  },
  {
    name: "Pythagoras",
    clue: "Famous for the theorem about right triangles.",
    image: "https://i.imgur.com/VO7nZEF.jpeg",
    description: "An ancient Greek mathematician and philosopher, Pythagoras is best known for the Pythagorean Theorem, which relates the sides of a right triangle. He founded the Pythagorean school, where numbers were considered the foundation of the universe.",
  },
  {
    name: "Newton",
    clue: "Developed calculus and laws of motion.",
    image: "https://i.imgur.com/t6AGEZs.jpeg",
    description:"A physicist, mathematician, and astronomer, Newton developed calculus, formulated the laws of motion, and explained gravity. His work in optics and physics laid the groundwork for modern science."
  },
  {
    name: "Archimedes",
    clue: "Discovered buoyancy and shouted 'Eureka!'.",
    image: "https://i.imgur.com/3mK59FR.png",
    description: "A brilliant Greek mathematician, Archimedes made groundbreaking discoveries in geometry, calculus, and mechanics. He formulated the principle of buoyancy, invented war machines, and famously exclaimed 'Eureka!' upon discovering the displacement of water."
 },
  {
    name: "Fibonacci",
    clue: "Known for the sequence found in nature.",
    image: "https://i.imgur.com/3mK59FR.png",
    description: "An Italian mathematician known for introducing the Fibonacci sequence, a series of numbers found in nature, art, and architecture. His book Liber Abaci helped popularize the Hindu-Arabic numeral system in Europe.",

  },
  {
    name: "Turing",
    clue: "Pioneer of modern computing and codebreaking.",
    image: "https://i.imgur.com/l2ti4ut.jpeg",
    description: "Alan Turing, the father of modern computing, played a crucial role in breaking the Nazi Enigma code during WWII. His work on the Turing machine laid the foundation for artificial intelligence and theoretical computer science.",
  },
  {
    name: "Pascal",
    clue: "Developed Pascal's Triangle and probability theory.",
    image: "https://i.imgur.com/BC3gdFD.png",
    description: "A French mathematician, physicist, and inventor, Blaise Pascal contributed to probability theory, developed Pascal’s Triangle, and built one of the first mechanical calculators, the Pascaline.",
  },
  {
    name: "Descartes",
    clue: "Famous for Cartesian coordinates.",
    image: "https://i.imgur.com/mtBMjyh.jpeg",
    description: "A French philosopher and mathematician, Descartes developed Cartesian coordinates, revolutionizing geometry by linking algebra to spatial representation. He is also famous for the philosophical statement 'I think, therefore I am." }
];


const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const GuessTheMathematician = () => {
    const [questions, setQuestions] = useState(shuffleArray(mathematicians));
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(mathematicians));
  }, []);

  const checkGuess = () => {
    if (guess.toLowerCase() === questions[index].name.toLowerCase()) {
      setMessage("🎉 Correct! Well done!");
      setRevealed(true);
      if (!attempted) {
        setScore((prevScore) => prevScore + 1);
        setAttempted(true);
      }
    } else {
      setMessage("❌ Incorrect! Try again.");
    }
  };
  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      setQuestions(shuffleArray(mathematicians));
    }
    setGuess("");
    setMessage("");
    setRevealed(false);
    setAttempted(false);
  };

  const prevQuestion = () => {
    setIndex((prevIndex) => (prevIndex - 1 + mathematicians.length) % mathematicians.length);
    setGuess("");
    setMessage("");
    setRevealed(false);
  };

  return (
    <div className="newcont">
    <div className="guess-container">
      <h2>Guess the Mathematician</h2>
      <p className="clue">{questions[index].clue}</p>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="guess-input"
        placeholder="Enter name..."
        style={{color: "black"}}
      />
      <button className="check-btn" onClick={checkGuess}>Check Answer</button>
      <button className="next-btn" onClick={nextQuestion}>Next ➡</button>
      <button className="prev-btn" onClick={prevQuestion}>⬅ Previous</button>
      {message && <p className="result-message">{message}</p>}

      <div className="image-container">
        <img
          src={questions[index].image}
          alt={questions[index].name}
          className={revealed ? "math-image revealed" : "math-image blurred"}
        />
        {revealed && <p className="math-description">{questions[index].description}</p>}
      </div>

      <p className="score">Score: {score}</p>
    </div>
    </div>
  );
};

export default GuessTheMathematician;

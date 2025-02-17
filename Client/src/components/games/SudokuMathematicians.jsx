import React, { useState } from "react";
import "./SudokuMathematicians.css";

const initialBoard = [
  ["Gauss", "", "", "Euler"],
  ["", "Ramanujan", "Pythagoras", ""],
  ["", "Euler", "Ramanujan", ""],
  ["Pythagoras", "", "", "Gauss"]
];

const mathematicians = ["Gauss", "Euler", "Ramanujan", "Pythagoras"];

const SudokuMathematicians = () => {
  const [board, setBoard] = useState(initialBoard);
  const [message, setMessage] = useState("");

  const handleChange = (row, col, value) => {
    let newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    const isValid = (array) => {
      return array.every((row) =>
        mathematicians.every((mathematician) => row.includes(mathematician))
      );
    };

    const rowsValid = isValid(board);
    const colsValid = isValid(
      board.map((_, i) => board.map((row) => row[i])) // Transposing to check columns
    );

    setMessage(rowsValid && colsValid ? "🎉 Correct! Well done!" : "❌ Incorrect! Try again.");
  };

  return (
    <div className="sudoku-container">
      <h2 className="heading">Sudoku of Mathematicians</h2>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className="sudoku-cell"
                placeholder="?"
              />
            ))}
          </div>
        ))}
      </div>
      <button className="check-btn" onClick={checkSolution}>Check Solution</button>
      {message && <p className="result-message">{message}</p>}
    </div>
  );
};

export default SudokuMathematicians;

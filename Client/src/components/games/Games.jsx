import React from "react";
import { NavLink } from "react-router-dom";
import "./Games.css";
import { FaPuzzlePiece, FaBrain, FaHistory, FaCalculator, FaGamepad, FaChartPie } from "react-icons/fa";

const Games = () => {
  const games = [
    { name: "Guess the Mathematician", icon: <FaBrain />, path: "/guess-mathematician" },
    { name: "Formula Builder", icon: <FaCalculator />, path: "/formula-builder" },
    { name: "Math Duel", icon: <FaGamepad />, path: "/math-duel" },
    { name: "Matho Scope", icon: <FaHistory />, path: "/horo" }, // Added FaHistory as an example
  ];

  return (
    <div className="games-container">
      <h2 className="heading" style={{ color: "white" }}>Choose a Game to Play</h2>
      <div className="games-grid">
        {games.map((game, index) => (
          <NavLink to={game.path} key={index} className="game-card">
            <div className="game-icon">{game.icon}</div>
            <p>{game.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Games;

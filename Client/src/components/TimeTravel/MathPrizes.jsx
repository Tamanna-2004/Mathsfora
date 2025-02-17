import React, { useState } from "react";
import "./MathPrizes.css"
const MathPrizes = () => {
  const prizes = [
    { title: "Fields Medal", winner: "Maryam Mirzakhani", desc: "For her work on the dynamics and geometry of Riemann surfaces and their moduli spaces (2014)." },
    { title: "Abel Prize", winner: "Andrew Wiles", desc: "For proving Fermat's Last Theorem (2016)." },
    { title: "Clay Millennium Prize", winner: "Grigori Perelman", desc: "For proving the Poincaré Conjecture (2006)." },
    { title: "Fields Medal", winner: "Terence Tao", desc: "For his contributions to additive number theory, harmonic analysis, and partial differential equations (2006)." },
    { title: "Abel Prize", winner: "Jean-Pierre Serre", desc: "For his fundamental contributions to algebraic topology, algebraic geometry, and number theory (2003)." },
    { title: "Fields Medal", winner: "Cedric Villani", desc: "For his work on nonlinear Landau damping and the Boltzmann equation (2010)." },
    { title: "Abel Prize", winner: "John Tate", desc: "For his influence on algebraic number theory (2010)." },
    { title: "Fields Medal", winner: "Artur Avila", desc: "For his contributions to dynamical systems theory (2014)." },
    { title: "Abel Prize", winner: "Yakov Sinai", desc: "For his work in dynamical systems, ergodic theory, and mathematical physics (2014)." },
    { title: "Fields Medal", winner: "Ngô Bảo Châu", desc: "For his proof of the Fundamental Lemma in the Langlands Program (2010)." },
    { title: "Nobel Prize", winner: "John Nash", desc: "For his contributions to game theory." },
    { title: "Nobel Prize", winner: "Lars Hörmander", desc: "For his work in linear partial differential operators." },
    { title: "Nobel Prize", winner: "Bertrand Russell", desc: "For his contributions to logic and philosophy of mathematics." },
    { title: "Nobel Prize", winner: "Roger Penrose", desc: "For discoveries in mathematical physics." },
    { title: "Nobel Prize", winner: "David Hilbert", desc: "For his foundational work in mathematics." },
    { title: "Nobel Prize", winner: "Stephen Smale", desc: "For work on the topology of higher dimensions." },
    { title: "Nobel Prize", winner: "Alexander Grothendieck", desc: "For revolutionary advances in algebraic geometry." },
    { title: "Nobel Prize", winner: "Kurt Gödel", desc: "For his incompleteness theorems." },
    { title: "Nobel Prize", winner: "Henri Poincaré", desc: "For his work in topology and chaos theory." },
    { title: "Nobel Prize", winner: "Paul Dirac", desc: "For his contributions to quantum mechanics and mathematical physics." }
  ];

  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount(visibleCount >= prizes.length ? 10 : visibleCount + 10);
  };

  return (
    <div className="prizediv" style={{backgroundColor: "#333"}}>
    <div className="container" style={{backgroundColor: "#2c2626", maxWidth: "800px"}}>
      <h1 className="Heading_">Greatest Prizes in Mathematics</h1>
      <div className="prize-container">
        {prizes.slice(0, visibleCount).map((prize, index) => (
          <div className="prize-card" key={index}>
            <div className="prize-title">{prize.title}</div>
            <div className="prize-winner">{prize.winner}</div>
            <p className="price-desc" style={{color: "yellow"}}>{prize.desc}</p>
          </div>
        ))}
      </div>
      <button className="show-more" onClick={handleShowMore}>
        {visibleCount >= prizes.length ? "Show Less" : "Show More"}
      </button>
    </div>
    </div>
  );
};

export default MathPrizes;

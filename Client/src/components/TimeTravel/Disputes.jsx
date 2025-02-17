import React, { useEffect, useState } from 'react'


const disputes = {
    "1700-1750": [
        ["Calculus Controversy", "Newton vs. Leibniz", "Led to the development of calculus as a key mathematical tool for science and engineering."],
        ["Bernoulli Brothers Feud", "Johann vs. Jakob Bernoulli", "Helped advance probability theory and mechanics."],
        ["D'Alembert vs. Euler", "Foundations of Calculus", "Contributed to the refinement of mathematical analysis."]
    ],
    "1750-1800": [
        ["Lagrange vs. d'Alembert", "Lagrange, d'Alembert", "Influenced the development of classical mechanics and variational principles."],
        ["Euler vs. d'Alembert", "Euler, d'Alembert", "Led to advancements in fluid dynamics and hydrodynamics."],
        ["Laplace vs. Lagrange", "Laplace, Lagrange", "Pushed the field of celestial mechanics and the theory of planetary motion."]
    ],
    "1800-1850": [
        ["Gauss vs. Bolyai", "Gauss, Bolyai", "Led to the birth of non-Euclidean geometry, reshaping geometry and mathematics."],
        ["Fourier vs. Poisson", "Fourier, Poisson", "Laid the groundwork for Fourier analysis, which is crucial in signal processing."],
        ["Cauchy vs. Abel & Galois", "Cauchy, Abel, Galois", "Advanced the rigor in algebra and led to the creation of Galois Theory."]
    ],
    "1850-1900": [
        ["Kronecker vs. Cantor", "Kronecker, Cantor", "Controversy over set theory that led to the development of modern mathematics."],
        ["Poincaré vs. Hilbert", "Poincaré, Hilbert", "Contributed to topology, geometry, and the foundations of mathematics."],
        ["Lindemann vs. Hermite", "Lindemann, Hermite", "Proved that π is transcendental, helping to solve problems in geometry."]
    ],
    "1900-1950": [
        ["Brouwer vs. Hilbert", "Brouwer, Hilbert", "Laid the foundation for intuitionistic logic and constructive mathematics."],
        ["Gödel vs. Hilbert", "Gödel, Hilbert", "Led to Gödel's incompleteness theorem, reshaping the philosophy of mathematics."],
        ["Einstein vs. Schrödinger & Bohr", "Einstein, Schrödinger, Bohr", "Debates around quantum mechanics and the nature of reality."]
    ],
    "1950-2000": [
        ["Turing vs. Von Neumann", "Turing, Von Neumann", "Contributed to the field of computer science and artificial intelligence."],
        ["P vs. NP Problem", "Various", "Still unsolved, but critical in the study of computational complexity."],
        ["Andrew Wiles vs. Mathematicians", "Andrew Wiles, Various", "Solving Fermat's Last Theorem was a breakthrough in number theory."]
    ]
};
const Disputes = () => {
    
    const [openPeriod, setOpenPeriod] = useState(null);
      const [dialogData, setDialogData] = useState(null);
    
      const toggleDropdown = (period) => {
        setOpenPeriod((prev) => (prev === period ? null : period));
        console.log("Toggled OpenPeriod:", period);
    };
    
    const showDialog = (dispute) => {
        console.log("Clicked Discovery:", dispute);
        setDialogData({
            topic: dispute[0],  // Discovery
            figures: dispute[1], // Mathematicians
            impact: dispute[2]   // Impact
        });
    };
    
    
      const closeDialog = () => {
        setDialogData(null);
      };
    
      useEffect(() => {
        console.log("Updated openPeriod:", openPeriod);
      }, [openPeriod]);
    
      useEffect(() => {
        console.log("Updated dialogData:", dialogData);
      }, [dialogData]);
      

  return (
    <div className="disputecont" style={{backgroundColor: "#333", height: "100vh"}}>
    <div className="container">
    <h2>Famous Disputes in Mathematics</h2>
    {Object.entries(disputes).map(([period, disputesList]) => (
  <div key={period}>
    <div className="time-gap" onClick={() => toggleDropdown(period)}>
      {period}
    </div>
    {openPeriod === period && (
      <div className="dropdown-content active">
        <table className="dropdown-table">
          <thead>
            <tr>
              <th>Discovery</th>
              <th>Mathematician</th>
            </tr>
          </thead>
          <tbody>
            {disputesList.map((d, index) => (
              <tr key={index}>
                <td className="discovery" onClick={() => showDialog(d)}>
                  {d[0]}
                </td>
                <td>{d[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
))}

{dialogData && (
    <div className="overlay" onClick={closeDialog}>
        <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-title">{dialogData.topic}</div>  
            <div className="dialog-text">
                <strong>Mathematicians:</strong> {dialogData.figures}
            </div>
            <div className="dialog-text">
                <strong>Impact:</strong> {dialogData.impact}
            </div>
            <button className="close-btn" onClick={closeDialog}>
                Close
            </button>
        </div>
    </div>
)}

</div>
</div>
  )
}

export default Disputes

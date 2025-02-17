import { useState, useEffect } from "react";
import "./TTdiscoveries.css";

const timePeriods = [
    { period: "1700-1750", discoveries: [
        { name: "Calculus", mathematician: "Isaac Newton", year: 1687, description: "Calculus is the branch of mathematics that deals with rates of change and the accumulation of quantities.", explanation: "It was developed independently by both Isaac Newton and Gottfried Wilhelm Leibniz in the late 17th century. The fundamental concept of calculus revolves around derivatives and integrals, which are used to study motion, growth, and many other phenomena in science and engineering.", applications: "Calculus is used in physics (to model motion), engineering (for designing structures), economics (for optimization), and computer science (for algorithms)."},
        { name: "Probability Theory", mathematician: "Blaise Pascal", year: 1654, description: "Probability theory is a branch of mathematics concerned with analyzing random phenomena.", explanation: "Pascal, along with Pierre de Fermat, laid the foundations of probability theory through their work on gambling problems. They developed a mathematical framework for understanding chance and uncertainty.", applications: "Probability theory is used in fields such as statistics, economics, insurance, and decision theory, helping to assess risk and predict outcomes."}
    ]},
    { period: "1750-1800", discoveries: [
        { name: "Analytic Geometry", mathematician: "René Descartes", year: 1637, description: "Analytic geometry is the study of geometry using a coordinate system and algebraic methods.", explanation: "Descartes introduced the concept of using algebra to describe geometric figures. His work allowed the translation of geometric problems into algebraic equations, forming the basis of coordinate geometry.", applications: "Analytic geometry is used in physics, engineering, and computer graphics to model and solve problems involving shapes and curves." },
        { name: "Number Theory", mathematician: "Leonhard Euler", year: 1736, description: "Number theory is a branch of mathematics devoted to the study of the integers and more generally to objects built out of them.", explanation: "Euler made many contributions to number theory, including introducing the notion of the Euler's totient function and developing new insights into prime numbers and modular arithmetic.", applications: "Number theory is fundamental in cryptography, used in algorithms such as RSA encryption for securing online communication."}
    ]},
    { period: "1800-1850", discoveries: [
        { name: "Complex Analysis", mathematician: "Carl Friedrich Gauss", year: 1799, description: "Complex analysis is the study of functions that operate on complex numbers.", explanation: "Gauss developed complex analysis, which introduced the concept of complex numbers to study functions that are differentiable in the complex plane, leading to the development of new mathematical techniques.", applications: "Complex analysis is used in physics (quantum mechanics), engineering (electrical circuits), and fluid dynamics (modeling of turbulence and flow)."},
        { name: "Group Theory", mathematician: "Évariste Galois", year: 1832, description: "Group theory is the study of algebraic structures called groups, which are sets equipped with a binary operation.", explanation: "Galois developed group theory, which became a key component of modern algebra. His work focused on understanding the symmetries of equations and how these symmetries relate to solvability.", applications: "Group theory is used in chemistry (molecular symmetry), physics (symmetry in quantum mechanics), and cryptography (for generating secure keys)."}
    ]},
    { period: "1850-1900", discoveries: [
        { name: "Set Theory", mathematician: "Georg Cantor", year: 1874, description: "Set theory is the mathematical study of sets, collections of objects.", explanation: "Cantor developed set theory, introducing concepts like infinity and the notion of cardinality. His work established a foundation for modern mathematics, especially in the field of logic and foundations of mathematics.", applications: "Set theory is foundational in mathematics and logic and is used in computer science (data structures, databases) and the development of formal languages."},
        { name: "Fourier Transform", mathematician: "Joseph Fourier", year: 1822, description: "Fourier transform is a mathematical technique used to transform a function into a sum of sines and cosines.", explanation: "Fourier introduced the Fourier transform, which allows functions (like sound or signal data) to be analyzed in terms of their frequency components. This is key to analyzing waveforms and signals.", applications: "Fourier transforms are used in signal processing, image processing, quantum physics, and communication systems."}
    ]},
    { period: "1900-1950", discoveries: [
        { name: "Game Theory", mathematician: "John von Neumann", year: 1928, description: "Game theory is a mathematical framework for analyzing competitive situations where the outcomes depend on the actions of other participants.", explanation: "Neumann developed game theory to study strategic decision making in competitive environments. It has applications in economics, political science, and evolutionary biology.", applications: "Game theory is used in economics, business (competitive strategy), political science (voting systems), and AI (machine learning)."},
        { name: "Turing Machine", mathematician: "Alan Turing", year: 1936, description: "The Turing machine is a theoretical model of computation that defines an abstract machine that manipulates symbols on an infinite tape according to a set of rules.", explanation: "Turing introduced the Turing machine to formalize the concept of computation. It is a key model in theoretical computer science and helped define what is computable.", applications: "The Turing machine is foundational in computer science, influencing the design of modern computers, algorithms, and programming languages."}
    ]},
    { period: "1950-2000", discoveries: [
        { name: "Chaos Theory", mathematician: "Edward Lorenz", year: 1963, description: "Chaos theory studies the behavior of dynamical systems that are highly sensitive to initial conditions.", explanation: "Lorenz discovered that small changes in initial conditions of a system could lead to vastly different outcomes. This is known as the butterfly effect.", applications: "Chaos theory is used in meteorology, economics (financial modeling), and biology (population dynamics and genetics)."},
        { name: "P vs NP Problem", mathematician: "Stephen Cook", year: 1971, description: "A fundamental question in computer science regarding the difficulty of certain computational problems.", explanation: "The P vs NP problem asks whether every problem that can be verified quickly (in polynomial time) can also be solved quickly (in polynomial time). It remains one of the biggest open problems in computer science.", applications: "The P vs NP problem has deep implications for cryptography, algorithm design, and computational complexity theory."}
    ]}
];

const TTdiscoveries = () => {
  const [openPeriod, setOpenPeriod] = useState(null);
  const [dialogData, setDialogData] = useState(null);

  const toggleDropdown = (period) => {
    setOpenPeriod((prev) => (prev === period ? null : period));
  };
  
  const showDialog = (discovery) => {
    console.log("Clicked discovery:", discovery); // Debugging
    setDialogData(discovery);
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
    <div className="ttdis">
    <div className="container">
      <h2>Time Travel Mode - Mathematics Discoveries</h2>
      {timePeriods.map(({ period, discoveries }) => (
        <div key={period}>
          <div className="time-gap" onClick={() => toggleDropdown(period)}>
            {period}
          </div>
          {openPeriod === period && (
            <div className={`dropdown-content ${openPeriod === period ? "active" : ""}`}>
              <table className="dropdown-table">
                <thead>
                  <tr>
                    <th>Discovery</th>
                    <th>Mathematician</th>
                  </tr>
                </thead>
                <tbody>
                  {discoveries.map((d) => (
                    <tr key={d.name}>
                      <td className="discovery" onClick={() => showDialog(d)}>
                        {d.name}
                      </td>
                      <td>{d.mathematician}</td>
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
            <div className="dialog-title">
              {dialogData.name} ({dialogData.year})
            </div>
            <div className="dialog-text">
              <strong>Description:</strong> {dialogData.description}
            </div>
            <div className="dialog-text">
              <strong>Explanation:</strong> {dialogData.explanation}
            </div>
            <div className="dialog-text">
              <strong>Applications:</strong> {dialogData.applications}
            </div>
            <button className="close-btn" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default TTdiscoveries;

// <body>
//     <div class="container">
//         <h2>Time Travel Mode - Mathematics Discoveries</h2>

//         <script>
            // const timePeriods = [
            //     { period: "1700-1750", discoveries: [
            //         { name: "Calculus", mathematician: "Isaac Newton", year: 1687, description: "Calculus is the branch of mathematics that deals with rates of change and the accumulation of quantities.", explanation: "It was developed independently by both Isaac Newton and Gottfried Wilhelm Leibniz in the late 17th century. The fundamental concept of calculus revolves around derivatives and integrals, which are used to study motion, growth, and many other phenomena in science and engineering.", applications: "Calculus is used in physics (to model motion), engineering (for designing structures), economics (for optimization), and computer science (for algorithms)."},
            //         { name: "Probability Theory", mathematician: "Blaise Pascal", year: 1654, description: "Probability theory is a branch of mathematics concerned with analyzing random phenomena.", explanation: "Pascal, along with Pierre de Fermat, laid the foundations of probability theory through their work on gambling problems. They developed a mathematical framework for understanding chance and uncertainty.", applications: "Probability theory is used in fields such as statistics, economics, insurance, and decision theory, helping to assess risk and predict outcomes."}
            //     ]},
            //     { period: "1750-1800", discoveries: [
            //         { name: "Analytic Geometry", mathematician: "René Descartes", year: 1637, description: "Analytic geometry is the study of geometry using a coordinate system and algebraic methods.", explanation: "Descartes introduced the concept of using algebra to describe geometric figures. His work allowed the translation of geometric problems into algebraic equations, forming the basis of coordinate geometry.", applications: "Analytic geometry is used in physics, engineering, and computer graphics to model and solve problems involving shapes and curves." },
            //         { name: "Number Theory", mathematician: "Leonhard Euler", year: 1736, description: "Number theory is a branch of mathematics devoted to the study of the integers and more generally to objects built out of them.", explanation: "Euler made many contributions to number theory, including introducing the notion of the Euler's totient function and developing new insights into prime numbers and modular arithmetic.", applications: "Number theory is fundamental in cryptography, used in algorithms such as RSA encryption for securing online communication."}
            //     ]},
            //     { period: "1800-1850", discoveries: [
            //         { name: "Complex Analysis", mathematician: "Carl Friedrich Gauss", year: 1799, description: "Complex analysis is the study of functions that operate on complex numbers.", explanation: "Gauss developed complex analysis, which introduced the concept of complex numbers to study functions that are differentiable in the complex plane, leading to the development of new mathematical techniques.", applications: "Complex analysis is used in physics (quantum mechanics), engineering (electrical circuits), and fluid dynamics (modeling of turbulence and flow)."},
            //         { name: "Group Theory", mathematician: "Évariste Galois", year: 1832, description: "Group theory is the study of algebraic structures called groups, which are sets equipped with a binary operation.", explanation: "Galois developed group theory, which became a key component of modern algebra. His work focused on understanding the symmetries of equations and how these symmetries relate to solvability.", applications: "Group theory is used in chemistry (molecular symmetry), physics (symmetry in quantum mechanics), and cryptography (for generating secure keys)."}
            //     ]},
            //     { period: "1850-1900", discoveries: [
            //         { name: "Set Theory", mathematician: "Georg Cantor", year: 1874, description: "Set theory is the mathematical study of sets, collections of objects.", explanation: "Cantor developed set theory, introducing concepts like infinity and the notion of cardinality. His work established a foundation for modern mathematics, especially in the field of logic and foundations of mathematics.", applications: "Set theory is foundational in mathematics and logic and is used in computer science (data structures, databases) and the development of formal languages."},
            //         { name: "Fourier Transform", mathematician: "Joseph Fourier", year: 1822, description: "Fourier transform is a mathematical technique used to transform a function into a sum of sines and cosines.", explanation: "Fourier introduced the Fourier transform, which allows functions (like sound or signal data) to be analyzed in terms of their frequency components. This is key to analyzing waveforms and signals.", applications: "Fourier transforms are used in signal processing, image processing, quantum physics, and communication systems."}
            //     ]},
            //     { period: "1900-1950", discoveries: [
            //         { name: "Game Theory", mathematician: "John von Neumann", year: 1928, description: "Game theory is a mathematical framework for analyzing competitive situations where the outcomes depend on the actions of other participants.", explanation: "Neumann developed game theory to study strategic decision making in competitive environments. It has applications in economics, political science, and evolutionary biology.", applications: "Game theory is used in economics, business (competitive strategy), political science (voting systems), and AI (machine learning)."},
            //         { name: "Turing Machine", mathematician: "Alan Turing", year: 1936, description: "The Turing machine is a theoretical model of computation that defines an abstract machine that manipulates symbols on an infinite tape according to a set of rules.", explanation: "Turing introduced the Turing machine to formalize the concept of computation. It is a key model in theoretical computer science and helped define what is computable.", applications: "The Turing machine is foundational in computer science, influencing the design of modern computers, algorithms, and programming languages."}
            //     ]},
            //     { period: "1950-2000", discoveries: [
            //         { name: "Chaos Theory", mathematician: "Edward Lorenz", year: 1963, description: "Chaos theory studies the behavior of dynamical systems that are highly sensitive to initial conditions.", explanation: "Lorenz discovered that small changes in initial conditions of a system could lead to vastly different outcomes. This is known as the butterfly effect.", applications: "Chaos theory is used in meteorology, economics (financial modeling), and biology (population dynamics and genetics)."},
            //         { name: "P vs NP Problem", mathematician: "Stephen Cook", year: 1971, description: "A fundamental question in computer science regarding the difficulty of certain computational problems.", explanation: "The P vs NP problem asks whether every problem that can be verified quickly (in polynomial time) can also be solved quickly (in polynomial time). It remains one of the biggest open problems in computer science.", applications: "The P vs NP problem has deep implications for cryptography, algorithm design, and computational complexity theory."}
            //     ]}
            // ];

//             function generateTimePeriods() {
//     let container = document.querySelector(".container");
//     timePeriods.forEach(({ period, discoveries }) => {
//         let gapDiv = document.createElement("div");
//         gapDiv.className = "time-gap";
//         gapDiv.innerText = period;
//         gapDiv.onclick = () => toggleDropdown(period);
//         container.appendChild(gapDiv);
        
//         let dropdownDiv = document.createElement("div");
//         dropdownDiv.id = period;
//         dropdownDiv.className = "dropdown-content";
//         dropdownDiv.innerHTML = `<table class='dropdown-table'>
//             <tr><th>Discovery</th><th>Mathematician</th></tr>
//             ${discoveries.map(d => `
//                 <tr>
//                     <td class='discovery' data-title="${d.name}" data-year="${d.year}" data-description="${d.description}" data-explanation="${d.explanation}" data-applications="${d.applications}">
//                         ${d.name}
//                     </td>
//                     <td>${d.mathematician}</td>
//                 </tr>`).join('')}
//         </table>`;
        
//         container.appendChild(dropdownDiv);
//     });

//     // Attach click event listeners for discovery items
//     const discoveryItems = document.querySelectorAll('.discovery');
//     discoveryItems.forEach(item => {
//         item.addEventListener('click', function() {
//             const title = this.getAttribute('data-title');
//             const year = this.getAttribute('data-year');
//             const description = this.getAttribute('data-description');
//             const explanation = this.getAttribute('data-explanation');
//             const applications = this.getAttribute('data-applications');
//             showDialog(title, year, description, explanation, applications);
//         });
//     });
// }

// function toggleDropdown(period) {
//     let dropdown = document.getElementById(period);
//     dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
// }

// function showDialog(title, year, description, explanation, applications) {
//     let dialogHTML = `
//         <div class="dialog-title">${title} (${year})</div>
//         <div class="dialog-text"><strong>Description:</strong> ${description}</div>
//         <div class="dialog-text"><strong>Explanation:</strong> ${explanation}</div>
//         <div class="dialog-text"><strong>Applications:</strong> ${applications}</div>
//         <button class="close-btn" onclick="closeDialog()">Close</button>
//     `;
//     let dialog = document.createElement('div');
//     dialog.className = 'dialog-box';
//     dialog.innerHTML = dialogHTML;

//     let overlay = document.createElement('div');
//     overlay.className = 'overlay';
//     overlay.onclick = closeDialog;
//     document.body.appendChild(overlay);

//     document.body.appendChild(dialog);
//     document.querySelector('.dialog-box').style.display = 'block';
//     document.querySelector('.overlay').style.display = 'block';
// }

// function closeDialog() {
//     let dialog = document.querySelector('.dialog-box');
//     let overlay = document.querySelector('.overlay');
//     if (dialog) dialog.remove();
//     if (overlay) overlay.remove();
// }

// window.onload = generateTimePeriods;

//         </script>
//     </div>
// </body>


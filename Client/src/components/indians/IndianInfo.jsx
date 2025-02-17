import React from "react";
import "./IndianInfo.css";

const mathematicians = [
  {
    name: "Srinivasa Ramanujan",
    image: "https://imgs.search.brave.com/KNjP48APnWjgEz8nLHAOW-lInItjy-Gfr2HyanuVZXU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDY1OTY3/MDIuanBn",
    description: "Srinivasa Ramanujan was an Indian mathematician known for his contributions to number theory, continued fractions, and infinite series.",
    awards: ["Fellow of the Royal Society", "Copley Medal"],
  },
  {
    name: "Aryabhata",
    image: "https://imgs.search.brave.com/FpiEQWqDJwFm7jsAlv_NXNtOgV8Gts0LGXE_8fpxnD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRmLzY5/LzdjLzRmNjk3Y2Y2/ZDZkNWUwZmQ4YTVk/ZDFlNGVlZGFjYTE1/LmpwZw  ",
    description: "Aryabhata was an ancient Indian mathematician and astronomer. He is known for his work on the approximation of pi and the concept of zero.",
    awards: ["None (Ancient Era)"],
  },
  {
    name: "C. R. Rao",
    image: "https://imgs.search.brave.com/42NXf1O9VA1TJEZ5MRL7VX_mxLYHCNlhhJEuzteUArQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85Lzk3L0Nh/bHlhbXB1ZGlfUmFk/aGFrcmlzaG5hX1Jh/b19hdF9JU0lfQ2hl/bm5haV8lMjhjcm9w/cGVkJTI5LkpQRy81/MTJweC1DYWx5YW1w/dWRpX1JhZGhha3Jp/c2huYV9SYW9fYXRf/SVNJX0NoZW5uYWlf/JTI4Y3JvcHBlZCUy/OS5KUEc",
    description: "C. R. Rao is an Indian-American mathematician and statistician known for his groundbreaking contributions to multivariate analysis and linear models.",
    awards: ["Padma Vibhushan", "National Medal of Science"],
  },
  {
    name: "Harish-Chandra",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Harish-Chandra_4.jpg",
    description: "Harish-Chandra was an Indian-American mathematician and physicist known for his work in representation theory and harmonic analysis.",
    awards: ["None (Though highly acclaimed in mathematics circles)"],
  },
  {
    name: "Raghunath Rao",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/The_President%2C_Smt._Pratibha_Devisingh_Patil_presenting_the_Padma_Bhushan_Award_to_Dr._Madabusi_Santanam_Raghunathan%2C_at_an_Investiture_Ceremony-II%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_April_04%2C_2012.jpg/440px-thumbnail.jpg",
    description: "Raghunath Rao was an influential Indian mathematician who contributed to algebraic geometry.",
    awards: ["Padma Bhushan"],
  },
  {
    name: "Brahmagupta",
    image: "https://imgs.search.brave.com/rDwYLKsQ8fuH4J6cjHAQVi2FvN9WsNV8QRP5c5zU6kI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuamF2YXRwb2lu/dC5jb20vYmlvZ3Jh/cGh5L2ltYWdlcy9i/cmFobWFndXB0YS5w/bmc",
    description: "Brahmagupta was an ancient Indian mathematician and astronomer. He is known for his work on solving quadratic equations and his early definitions of zero.",
    awards: ["None (Ancient Era)"],
  },
  {
    name: "K.S. Chandrasekhars",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Komaravolu_Chandrasekharan_MFO_1987.jpg",
    description: "K. S. Chandrasekharan was an Indian mathematician known for his work in algebraic geometry and number theory.",
    awards: ["Shanti Swarup Bhatnagar Prize for Science and Technology"],
  },
  {
    name: "Manjul Bhargava",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Manjul_Bhargava_FieldsMedal.jpg",
    description: "Manjul Bhargava is an Indian-American mathematician known for his work in number theory and algebraic geometry.",
    awards: ["Fields Medal", "Clay Research Award"],
  },
];

function App() {
  return (
    <div className="indianconatiner">
    <div className="app-container">
      <header className="headerindians">
        <h1>Indian Mighty Mathematicians</h1>
        <p>Celebrating the mathematical genius of India</p>
      </header>
      <div className="mathematicians-grid">
        {mathematicians.map((mathematician, index) => (
          <div className="mathematician-card" key={index}>
            <img src={mathematician.image} alt={mathematician.name} className="mathematician-image" />
            <h2>{mathematician.name}</h2>
            <p className="description">{mathematician.description}</p>
            <h3>Awards and Honors</h3>
            <ul>
              {mathematician.awards.map((award, idx) => (
                <li key={idx}>{award}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
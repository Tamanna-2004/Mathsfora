import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mathematicians.css";
import mathematicians from "../../data/mathematiciansData"; 

const Mathematicians = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter mathematicians based on search term
  const filteredMathematicians = mathematicians.filter((mathematician) =>
    mathematician.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mathematicians-container">
      <h2 className="heading" style={{color:"white"}}>Explore Great Mathematicians</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search Mathematicians..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="math-grid">
        {filteredMathematicians.length > 0 ? (
          filteredMathematicians.map((mathematician, index) => (
            <div
              className="math-card"
              key={index}
              onClick={() => navigate(`/mathematician/${encodeURIComponent(mathematician.name)}`)} // Navigate to details page
            >
              <img src={mathematician.image} alt={mathematician.name} />
              <h3>{mathematician.name}</h3>
              <p className="quote">"{mathematician.quote}"</p>
            </div>
          ))
        ) : (
          <p className="no-results">No mathematicians found.</p>
        )}
      </div>
    </div>
  );
};

export default Mathematicians;

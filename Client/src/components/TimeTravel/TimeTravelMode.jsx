import React from "react";
import "./TimeTravelMode.css"; // Importing CSS for styling
import { NavLink } from "react-router-dom";

const TimeTravelMode = () => {
  return (

    <div className="timecont">
    <div className="container" style={{backgroundColor: "#333", marginTop: "10px"}}>
      {/* Heading */}
      <h1>Time Travel Mode</h1>

      {/* Sections */}

      <NavLink to="/discoveries" className="link_">
      <Section
        title="Huge Discoveries"
        content="Throughout the centuries, humanity has made incredible discoveries that changed the course of history. From the invention of the wheel to the groundbreaking works in mathematics and physics, these discoveries continue to shape our world."
        buttonText="Learn More"
      />
      </NavLink>

        <NavLink to="/disputes" className="link_">
      <Section
        title="Huge Disputes"
        content="History is filled with intense disputes, some of which have altered the trajectory of civilizations. Political, religious, and ideological conflicts have shaped societies and left their mark on the global stage."
        buttonText="Explore Disputes"
      />
      </NavLink>

      <NavLink to="/player" className="link_">
      <Section
        title="Modern-Day Applications"
        content="Discover how ancient knowledge and scientific discoveries are applied in modern technology, medicine, space exploration, and more. The power of time travel lies in understanding the past to innovate in the present."
        buttonText="See Applications"
      />
      </NavLink>

      <NavLink to="/prizes" className="link_">
      <Section
        title="Huge Prizes"
        content="Many great discoveries have been rewarded with prestigious prizes like the Nobel Prize. These honors recognize groundbreaking work in fields ranging from physics to economics, inspiring future generations to keep exploring."
        buttonText="Read About Prizes"
      />
      </NavLink>

      

      {/* Footer */}
      <footer>
        <p>
          Created by <a href="#">Time Travel Mode Team</a> | 2025
        </p>
      </footer>
    </div>
    </div>
  );
};

// Section Component
const Section = ({ title, content, buttonText }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <p>{content}</p>
      <button className="btn">{buttonText}</button>
    </div>
  );
};


export default TimeTravelMode;

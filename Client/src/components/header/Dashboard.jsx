import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css"; // ✅ Import the CSS file
import { FaGamepad, FaUsers, FaClock, FaCalculator } from "react-icons/fa";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.name);
    }
  }, []);

  return (
    <div className="dashboard">
      {username ? (
        <h3 className="greeting">Welcome, {username}! 🎉</h3>
      ) : (
        <h3>Welcome to the Fun Zone!</h3>
      )}

      <div className="dashboard-grid">
        <NavLink to="/mathematicians" className="dashboard-btn" onClick={() => console.log("Clicked!")}>
        <FaCalculator className="icon" />
        Explore Mathematicians
        </NavLink>

        <NavLink to="/posts" className="dashboard-btn">
          <FaUsers className="icon" />
          Community Hub
        </NavLink>
        <NavLink to="/time-travel" className="dashboard-btn">
          <FaClock className="icon" />
          Time Travel
        </NavLink>
        <NavLink to="/games" className="dashboard-btn">
          <FaGamepad className="icon" />
          Games
        </NavLink>
        
      </div>

      {!username && (
        <div className="signup-container">
          <NavLink to="/login" className="signup-btn">
            Signin Now
          </NavLink>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;

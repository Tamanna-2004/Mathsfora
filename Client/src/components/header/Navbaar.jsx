import React, { useState, useEffect } from "react";
import "./Navbaar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Dashboard from "./Dashboard";

const Navbaar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showDashboard, setShowDashboard] = useState(isMobile);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.name);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login"); // Redirect to login after logout
  };

  // Function to check login status before navigating to Community Hub
  const handleCommunityClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      navigate("/login"); // Redirect to login page
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <>
      {isMobile && showDashboard ? (
        <Dashboard />
      ) : (
        <div className="navbar">
          <div className="nav-items">
            <div className="logo"></div>
            <img src="cartoonImages/logo-removebg-preview.png" style={{height:"100px", width: "120px"}}/>
            <NavLink to="/">
              <p className="nav-link1" onClick={() => isMobile && setShowDashboard(true)}>Home</p>
            </NavLink>
            
            <NavLink to="/games">
              <p className="nav-link1">Games</p>
            </NavLink>

            {/* 🔹 Prevent Community access if user is not logged in */}
            <NavLink to={isLoggedIn ? "/posts" : "#"} onClick={handleCommunityClick}>
              <p className="nav-link1">Community</p>
            </NavLink>

            <NavLink to="/time-travel">
              <p className="nav-link1">Time-Travel</p>
            </NavLink>

            <NavLink to="/spotlight">
              <p className="nav-link1">spotlight on India</p>
            </NavLink>

          </div>

          <div className="logout">
            {!isLoggedIn ? (
              <NavLink to="/login">
                <div className="signInButton">
                  <p>SIGN-IN</p>
                </div>
              </NavLink>
            ) : (
              <>
                <div className="signInButton">
                  <p onClick={handleLogout}>Logout</p>
                </div>
                
                <Avatar className="avatar" sx={{ bgcolor: "#2196F3", cursor: "pointer" }}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbaar;

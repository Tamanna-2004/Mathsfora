import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, LinearProgress } from "@mui/material";
import { AccountCircle, Email, Phone, EmojiEvents } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5500/api/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (!user) return <Typography variant="h6">User not found</Typography>;

  return (
    <div className="maincont">
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Greeting Message */}
      <motion.h2
        className="greeting1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome, <span>{user.name}!</span> 🚀
      </motion.h2>

      {/* Table-like Data Display */}
      <div className="profile-table">
        <motion.div
          className="profile-row"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AccountCircle className="icon" />
          <Typography>{user.name}</Typography>
        </motion.div>

        <motion.div
          className="profile-row"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Email className="icon" />
          <Typography>{user.email}</Typography>
        </motion.div>

        <motion.div
          className="profile-row"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Phone className="icon" />
          <Typography>{user.phone || "No phone added"}</Typography>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="progress-container"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="body2">Progress:</Typography>
          <LinearProgress
            className="progress-bar"
            variant="determinate"
            value={user.progress || 50}
          />
        </motion.div>

        {/* Badges */}
        <motion.div
          className="badges"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography variant="h6">Badges:</Typography>
          <EmojiEvents className="icon" />
          {user.progress > 80 && <EmojiEvents className="icon" />}
        </motion.div>
      </div>

      {/* Action Button */}
      <motion.button
        className="button"
        whileHover={{ scale: 1.1 }}
      >
        View More
      </motion.button>
    </motion.div>
    </div>
  );
};

export default ProfilePage;

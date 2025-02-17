import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PeopleIcon from '@mui/icons-material/People';

const Bottombar = () => {

    const [value, setValue] = useState(0);
    const navigate = useNavigate();
  
    const handleNavigation = (event, newValue) => {
      setValue(newValue);
      if (newValue === 0) navigate("/");
      if (newValue === 1) navigate("/games");
      if (newValue === 2) navigate("/profile");
      if (newValue == 3) navigate("/posts");
    };

  return (
    <div>

    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      <BottomNavigation value={value} onChange={handleNavigation} showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Games" icon={<SportsEsportsIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Community" icon={<PeopleIcon/>}/>
      </BottomNavigation>
    </Paper>
      
    </div>
  )
}

export default Bottombar

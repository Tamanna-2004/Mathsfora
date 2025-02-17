import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbaar from "./components/header/Navbaar";
import SignIn from "./components/Login/SignIn";
import Register from "./components/Login/Register";
import Dashboard from "./components/header/Dashboard";
import Mathematicians from "./components/Mathematicians/Mathematicians";
import Bottombar from "./components/header/Bottombar";
import Games from "./components/games/Games";
import SudokuMathematicians from "./components/games/SudokuMathematicians";
import GuessTheMathematician from "./components/games/GuessTheMathematician";
import TimeTravelPuzzle from "./components/games/TimeTravelPuzzle";
import Info from "./components/Mathematicians/Info";
import CommunityHub from "./components/community/CommunityHub";
import TimeTravelMode from "./components/TimeTravel/TimeTravelMode";
import TTdiscoveries from "./components/TimeTravel/TTdiscoveries";
import Disputes from "./components/TimeTravel/Disputes";
import VideoPlayer from "./components/TimeTravel/VideoPlayer";
import MathPrizes from "./components/TimeTravel/MathPrizes";
import ProfilePage from "./components/profile/ProfilePage";
import MathLaBot from "./components/chatbot/MathLaBot";
import { FaRobot } from "react-icons/fa"; // ✅ Import robot icon
import FormulaBuilder from "./components/games/FormulaBuilder";
import MathGame from "./components/games/MathGame";
import HoroScope from "./components/games/HoroScope";
import IndianInfo from "./components/indians/IndianInfo";


function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatbot, setShowChatbot] = useState(false); // ✅ State for chatbot visibility

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <BrowserRouter>
      {!isMobile ? <Navbaar /> : <Bottombar />}
      <Routes>
        <Route path="/" element={isMobile ? <Dashboard /> : <Mathematicians />} />
        <Route path="/mathematicians" element={<Mathematicians />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<Games />} />
        <Route path="/sudoku" element={<SudokuMathematicians />} />
        <Route path="/guess-mathematician" element={<GuessTheMathematician />} />
        <Route path="/time-travel-puzzle" element={<TimeTravelPuzzle />} />
        <Route path="/mathematician/:name" element={<Info />} />
        <Route path="/posts" element={<CommunityHub />} />
        <Route path="/time-travel" element={<TimeTravelMode />} />
        <Route path="/discoveries" element={<TTdiscoveries />} />
        <Route path="/disputes" element={<Disputes />} />
        <Route path="/player" element={<VideoPlayer />} />
        <Route path="/prizes" element={<MathPrizes />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/formula-builder" element={<FormulaBuilder/>}/>
        <Route path="/math-duel" element={<MathGame/>}/>
        <Route path="/horo" element={<HoroScope/>}/>
        <Route path="/spotlight" element={<IndianInfo/>}/>
      </Routes>

      {/* ✅ Floating Chatbot Button */}
      <button className="chatbot-icon" onClick={() => setShowChatbot(!showChatbot)}>
        <FaRobot size={28} />
      </button>

      {/* ✅ Chatbot Container (Appears when clicked) */}
      <div className={`chatbot-wrapper ${showChatbot ? "show" : ""}`}>
        <MathLaBot />
        <button className="close-chatbot" onClick={() => setShowChatbot(false)}></button>
      </div>
    </BrowserRouter>
  );
}

export default App;

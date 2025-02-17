import React, { useEffect } from "react";
import "./Info.css";
import { useParams, useNavigate } from "react-router-dom";
import mathematicians from "../../data/mathematiciansData"; // Import the array

const Info = () => {

    //to render in UI
    const { name } = useParams();
    const navigate = useNavigate();
  
    const mathematician = mathematicians.find((m) => m.name === decodeURIComponent(name));


  useEffect(() => {
    // Scroll reveal animation
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const reveal = () => {
      revealElements.forEach((el) => {
        let rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal(); // Trigger on mount

    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  // Scroll to Top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Speech Synthesis
  const speechText = `
    ${mathematician.quote} 

    ${mathematician.intro}

    Personal Life:
    ${mathematician.personalLife}

    Achievements:
    ${mathematician.achievements.join(', ')}

    Controversies:
    ${mathematician.controversies.join(', ')}

    Legacy:
    ${mathematician.legacy}
  `;
  const handleSpeak = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = speechText;
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };


  if (!mathematician) {
    return <h2 className="text-center mt-10 text-red-500">Mathematician Not Found</h2>;
  }

  return (
    <div className="main-container">
      <header>
        <div className="quote">
          <p>{mathematician.quote}</p>
          <div className="btns">
            <button onClick={handleSpeak} id="speak-btn">🔊</button>
          <button onClick={handleStop} id="stop-btn">⏹️</button>
          </div>
        </div>
      </header>

      <div className="container-info">
        <div className="left-panel">
          <div className="einstein-image-container">
            <img
              src={mathematician.originalImage}
              alt={mathematician.name}
              className="einstein-img"
            />
          </div>
          <table className="dynamic-table">
            <tbody>
              <tr>
                <td className="heading">Personal Info</td>
                <td className="info">
                <p style={{color: "black"}}><strong>Name:</strong> {mathematician.name}</p>
                  <p style={{color: "black"}}><strong>Born:</strong> {mathematician.birth}</p>
                  <p style={{color: "black"}}><strong>Death:</strong> {mathematician.death}</p>
                  <p style={{color: "black"}}><strong>Nationality:</strong> {mathematician.nationality}</p>
                  <p style={{color: "black"}}><strong>Occupation:</strong> {mathematician.occupation}</p>
                  <p style={{color: "black"}}><strong>Notable Works:</strong> {mathematician.notableWorks}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="right-panel">
          <section className="bio scroll-reveal">
            <h2>Who am I?</h2>
            <p>
            {mathematician.intro}
            </p>
          </section>

          <section className="personal-life scroll-reveal">
            <h2>Personal Life</h2>
            <p>
            {mathematician.personalLife}
            </p>
          </section>

          <section className="achievements scroll-reveal">
            <h2>My Achievements</h2>
            <ul>
              {mathematician.achievements.map((achievement, index) => (
                <li key={index}style={{color: "black"}}>{achievement}</li>
              ))}
            </ul>
          </section>

          <section className="controversies scroll-reveal">
            <h2>Controversies</h2>
            <ul>
              {mathematician.controversies.map((controversy, index) => (
                <li key={index} style={{color: "black"}}>{controversy}</li>
              ))}
            </ul>
          </section>

          <section className="legacy scroll-reveal">
            <h2>My Legacy</h2>
            <p>
            {mathematician.legacy}
            </p>
          </section>
        </div>
      </div>

      <button onClick={scrollToTop} className="scroll-to-top">
        ↑
      </button>
    </div>
  );
};

export default Info;

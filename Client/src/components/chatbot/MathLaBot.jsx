import React, { useState } from "react";
import axios from "axios";
import { evaluate } from "mathjs";
import "./MathLaBot.css";

const randomFacts = [
  "Did you know? The number zero was independently invented by the Mayans and Indians!",
  "The Golden Ratio appears in art, nature, and architecture!",
  "Euler’s Identity is considered the most beautiful equation in mathematics!",
  "Pythagoras' Theorem is used in construction, navigation, and even video game physics!",
  "The Fibonacci sequence appears in sunflowers, pinecones, and galaxies!",
  "Leonhard Euler introduced the concept of mathematical functions!",
  "Ramanujan independently discovered results in number theory that still amaze mathematicians!",
  "Alan Turing laid the foundation for modern computing!",
  "The square root of 2 was the first known irrational number!",
  "Infinity comes in different sizes! Some infinities are bigger than others!",
  "Archimedes approximated pi using polygons!",
  "Einstein's E=mc² shows that energy and mass are interchangeable!",
  "The Riemann Hypothesis remains one of the biggest unsolved problems in mathematics!",
  "Fourier transforms are widely used in signal processing and quantum physics!",
  "The number e is the base of natural logarithms and appears in growth models!",
  "Chaos theory explains why weather prediction is so difficult!",
  "A perfect number is a positive integer equal to the sum of its proper divisors!",
  "There are infinitely many prime numbers!",
  "Gauss was called the 'Prince of Mathematicians'!",
  "Kurt Gödel's incompleteness theorems shook the foundations of mathematics!",
];

const MathLaBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    let responseText = "";

    // Safe mathematical evaluation using mathjs
    if (/^(\d+(\s*[-+*/]\s*\d+)+)$/.test(input)) {
      try {
        responseText = `The result is: ${evaluate(input)}`;
      } catch {
        responseText = "I couldn't compute that. Try a valid arithmetic expression!";
      }
    }
    // Basic calculus handling
    else if (/\b(differentiate|derivative|integration|integrate)\b/i.test(input)) {
      if (/\b(x\^2)\b/i.test(input)) {
        responseText = "The derivative of x^2 is 2x, and the integral of x^2 is x^3/3 + C.";
      } else {
        responseText = "I can help with basic calculus! Try asking about differentiation or integration of common functions.";
      }
    }
    // Wikipedia API Fetching
    else {
      try {
        const res = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`
        );
        responseText = res.data.extract || "I couldn't find relevant information.";
      } catch {
        responseText = "Sorry, I couldn't fetch that information.";
      }
    }

    const botMessage = { text: responseText, sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInput("");
  };

  // Function to handle speech synthesis using the Web Speech API
  const handleSpeak = (text) => {
    const synth = window.speechSynthesis;

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="container">
      <h1>MathLaBot</h1>
      <div id="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
            {msg.text}
            {msg.sender === "bot" && (
              <button className="speakButton" onClick={() => handleSpeak(msg.text)}>
                {isSpeaking ? "Stop" : "Speak"}
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          style={{color: "black"}}
        />
        <button id="sendButton" onClick={sendMessage}>Send</button>
      </div>
      <div className="extra-buttons">
        <button id="factButton" onClick={() => {
          const fact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
          setMessages((prevMessages) => [...prevMessages, { text: fact, sender: "bot" }]);
        }}>Random Fact</button>
        <button id="clearButton" onClick={() => setMessages([])}>Clear</button>
      </div>
    </div>
  );
};

export default MathLaBot;

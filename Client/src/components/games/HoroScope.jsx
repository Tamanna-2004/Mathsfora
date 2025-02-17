import React, { useState } from "react";
import "./HoroScope.css";

const horoscopes = [
  { name: "The Visionary", condition: (num) => isFibonacci(num), message: "Your mind sees beyond the numbers. You are destined for innovation and breakthroughs!" },
  { name: "The Strategist", condition: (num) => num % 2 === 0, message: "Logic and precision guide your path. Planning is your superpower!" },
  { name: "The Dreamer", condition: (num) => num % 2 !== 0, message: "You think outside the box and embrace creativity. Your imagination knows no bounds!" },
  { name: "The Independent", condition: (num) => isPrime(num), message: "You forge your own destiny, unshaken by others. A true pioneer!" },
  { name: "The Balanced One", condition: (num) => Number.isInteger(Math.sqrt(num)), message: "Stability and harmony define your path. You are grounded and wise!" },
  { name: "The Enigma", condition: () => true, message: "Your number is a mystery, defying patterns. You are unpredictable and full of surprises!" },
  { name: "The Seeker", condition: (num) => num % 5 === 0, message: "You have an insatiable curiosity for knowledge. You always seek the truth!" },
  { name: "The Optimist", condition: (num) => num % 7 === 0, message: "Your positivity lights up the world. You're the beacon of hope and encouragement!" },
  { name: "The Analyzer", condition: (num) => num % 3 === 0, message: "Your analytical skills are unmatched. You solve complex problems with ease!" },
  { name: "The Leader", condition: (num) => num % 11 === 0, message: "Born to lead, you have the courage and wisdom to guide others to success!" },
  { name: "The Philosopher", condition: (num) => num % 4 === 0, message: "Deep thinking is your strength. You ponder the mysteries of life and the universe!" },
  { name: "The Rebel", condition: (num) => num % 6 === 0, message: "You challenge norms and push boundaries. Your rebellious spirit shapes the future!" },
  { name: "The Healer", condition: (num) => num % 8 === 0, message: "Compassion and understanding are your core. You bring healing and peace wherever you go!" },
  { name: "The Innovator", condition: (num) => isPerfectSquare(num), message: "Innovation flows through your veins. You are constantly creating the future!" },
  { name: "The Guardian", condition: (num) => isPrime(num) && num % 2 === 1, message: "You protect what matters most. You have a strong sense of responsibility!" },
  { name: "The Architect", condition: (num) => num % 9 === 0, message: "Your vision for structure and design leads you to create lasting legacies!" },
  { name: "The Adventurer", condition: (num) => num % 10 === 0, message: "Adventure calls to you. The world is full of endless opportunities, and you are ready to explore!" },
  { name: "The Artist", condition: (num) => isFibonacci(num) && num % 2 === 1, message: "You express yourself through creativity. Art is your language!" },
  { name: "The Alchemist", condition: (num) => num % 12 === 0, message: "You transform challenges into opportunities. Your ingenuity knows no bounds!" },
  { name: "The Mystic", condition: (num) => num % 13 === 0, message: "Mystical forces guide you. You see the unseen and understand the unspoken!" },
  { name: "The Collector", condition: (num) => num % 14 === 0, message: "You gather knowledge and experiences. The more you collect, the wiser you become!" },
  { name: "The Magician", condition: (num) => num % 15 === 0, message: "You wield power through your words and actions. Your influence is magical!" },
  { name: "The Voyager", condition: (num) => num % 16 === 0, message: "The world is your canvas. You travel far and wide, always learning and growing!" },
  { name: "The Whisperer", condition: (num) => num % 17 === 0, message: "You communicate with ease and understanding. People find solace in your words!" },
  { name: "The Champion", condition: (num) => num % 18 === 0, message: "Victory follows you. Your dedication and hard work always lead to success!" },
  { name: "The Observer", condition: (num) => num % 19 === 0, message: "You see the world as it truly is, not as it appears. Observation is your superpower!" },
  { name: "The Transformer", condition: (num) => num % 20 === 0, message: "Change is your ally. You have the power to transform any situation!" },
  { name: "The Navigator", condition: (num) => num % 21 === 0, message: "You always know the way. Your guidance leads others through the unknown!" },
  { name: "The Gardener", condition: (num) => num % 22 === 0, message: "You nurture growth and beauty. Everything you touch flourishes!" },
  { name: "The Thinker", condition: (num) => num % 23 === 0, message: "Contemplation is your strength. You thrive in deep thought and reflection!" },
  { name: "The Builder", condition: (num) => num % 24 === 0, message: "You create foundations for the future. Your work leaves a lasting legacy!" },
  { name: "The Empath", condition: (num) => num % 25 === 0, message: "You feel deeply and connect with others on a profound level. Your empathy is your power!" },
];

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function isFibonacci(num) {
  const isPerfectSquare = (x) => Number.isInteger(Math.sqrt(x));
  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

function isPerfectSquare(num) {
  return Number.isInteger(Math.sqrt(num));
}

function validateDate(input) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(input)) return "Invalid format! Use DD/MM/YYYY.";

  const [_, day, month, year] = input.match(regex).map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  const minYear = 1900;

  if (year < minYear || date > today || date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return "Enter a valid birthdate (DD/MM/YYYY) between 1900 and today.";
  }
  return null;
}

function HoroScope() {
  const [birthdate, setBirthdate] = useState("");
  const [fortune, setFortune] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [error, setError] = useState("");

  const getFortune = () => {
    const errorMsg = validateDate(birthdate);
    if (errorMsg) {
      setError(errorMsg);
      setFortune("");
      setHoroscope("");
      return;
    }

    setError("");
    const num = parseInt(birthdate.replace(/\D/g, ""), 10) % 100;
    const selectedHoroscope = horoscopes.find((h) => h.condition(num));
    setHoroscope(selectedHoroscope.name);
    setFortune(selectedHoroscope.message);
  };

  const resetGame = () => {
    setBirthdate("");
    setFortune("");
    setHoroscope("");
    setError("");
  };

  return (
    <div className="horo-full-container">
    <div className="horo-container">
      <h1>🔮 Mathoscope</h1>
      <p className="dob">Enter your birthdate (DD/MM/YYYY) to discover your *Mathematical Horoscope*!</p>
      <input
        type="text"
        placeholder="DD/MM/YYYY"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        maxLength="10"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={getFortune} disabled={error !== ""}>Reveal My Destiny</button>
      {fortune && (
        <>
          <h2 className="horoscope">✨ {horoscope} ✨</h2>
          <p className="fortune">{fortune}</p>
          <button className="try-again" onClick={resetGame}>🔄 Try Again</button>
        </>
      )}
    </div>
    </div>
  );
}

export default HoroScope;
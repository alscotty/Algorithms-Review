import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [guess, setGuess] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWord = async () => {
      const res = await fetch("https://random-word-api.herokuapp.com/word");
      const data = await res.json();
      setAnswer(data[0]);
    };
    fetchWord();
  }, []);

  // letters, want red if wrong, yellow if correct but wrong place, green if correct
  return (
    <div className="App">
      <h1>Hangman</h1>
      word to guess: {answer}
      <div>Make a guess!</div>
      {guess.split("").map((char, idx) => {
        let charColor = "";
        if (!answer.includes(char)) {
          charColor = "red";
        } else if (char === answer[idx]) {
          charColor = "green";
        } else {
          charColor = "yellow";
        }
        return <span style={{ color: charColor }}>{char}</span>;
      })}
      <br />
      <input value={guess} onChange={(e) => setGuess(e.target.value)}></input>
      <br />
      {guess == answer ? "Answer is correct!" : ""}
    </div>
  );
}

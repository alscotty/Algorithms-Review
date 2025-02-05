import { useState, useEffect, use } from "react";
import "./index.css";
/*
You are tasked with creating a simplified version of the popular word-guessing game Wordle using React. The game should allow a user to guess a predefined five-letter word within six attempts. Your implementation should focus on React fundamentals, component decomposition, state management, and user interaction.

Game Logic:
Get a 5 letter random word from api: https://random-word-api.herokuapp.com/word?number=1&length=5 which returns an array with 1 word in it.
Allow the user to input guesses via an input field.
After each guess, provide feedback by highlighting each letter:
Green if the letter is in the correct position.
Yellow if the letter is in the word but in the wrong position.
Gray if the letter is not in the word.
The user has a maximum of six attempts to guess the word.
End the game when the user guesses the word correctly or exhausts all attempts.
Display an appropriate message at the end of the game:
Congratulate the user if they win.
Reveal the correct word if they lose.
User Interaction:
The input field should accept only five-letter words.
Enable the user to submit their guess by pressing the "Enter" key or clicking a "Submit Guess" button.
Disable the input and submit button when the game is over.

*/
function App() {
  const [guesses, setGuesses] = useState(0);
  const [answerWord, setAnswerWord] = useState("");
  const [guessInput, setGuessInput] = useState("");
  const [submittedGuesses, setSubmittedGuesses] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async function () {
      const res = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1&length=5"
      );
      const data = await res.json();

      setAnswerWord(data[0]);
    };
    fetchData();
  }, []);

  const updateGuess = (e) => {
    setGuessInput(e.target.value);
  };

  const submitGuess = () => {
    if (guessInput.length !== 5) {
      setError("guess must be 5 letter word");
    } else {
      setError("");

      let lettersHtmlArray = [];

      for (let idx = 0; idx < 5; idx++) {
        let currentLetter = guessInput[idx];

        if (currentLetter == answerWord[idx]) {
          lettersHtmlArray.push(<span className="green">{currentLetter}</span>);
        } else if (answerWord.includes(currentLetter)) {
          lettersHtmlArray.push(
            <span className="yellow">{currentLetter}</span>
          );
        } else {
          lettersHtmlArray.push(<span className="red">{currentLetter}</span>);
        }
      }

      if (answerWord === guessInput) {
        setSuccessMessage("You won! Game ended");
      }

      setSubmittedGuesses([...submittedGuesses, lettersHtmlArray]);

      setGuesses(guesses + 1);
    }
  };

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">Guessing game</h1>
      answer: {answerWord}
      <br />
      Current guesses:
      {submittedGuesses.map((submittedGuess, idx) => {
        return (
          <span className="letters " key={idx}>
            {submittedGuess}
          </span>
        );
      })}
      <div className="flex flex-row items-center gap-6">
        Guesses {guesses}, limit 6
        <input
          type="text"
          placeholder="write 5 letter word"
          onChange={(e) => updateGuess(e)}
          value={guessInput}
        ></input>
        <button
          className="bg-sky-300 px-3 py-2 rounded hover:bg-sky-400"
          onClick={() => submitGuess()}
        >
          submit answer
        </button>
      </div>
      <div className="green">{successMessage}</div>
      {error}
    </main>
  );
}

export default App;

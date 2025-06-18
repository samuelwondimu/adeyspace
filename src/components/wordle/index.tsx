import React, { useState, useEffect, useRef } from "react";
import AmharicKeyboard from "./amharic-keyboard";
import { fiveLetterAmharicWords } from "./fiveLetterAmharicWords";

const WORD_LENGTH = 5;
const TOTAL_GUESSES = 6;

interface WordLineProps {
  word: string;
  correctWord: string;
  correctLetterObject: Record<string, number>;
  revealed: boolean;
}

function WordLine({
  word,
  correctWord,
  correctLetterObject,
  revealed,
}: WordLineProps) {
  return (
    <div className="flex flex-row space-y-1.5 space-x-1.5">
      {word.split("").map((letter, index) => {
        const guessLetter = letter.toLowerCase();
        const correctLetter = correctWord[index]?.toLowerCase();

        const isFilled = guessLetter !== " ";
        const hasCorrectLocation = isFilled && guessLetter === correctLetter;
        const hasCorrectLetter = isFilled && guessLetter in correctLetterObject;

        console.log(hasCorrectLetter, hasCorrectLocation);
        return (
          <LetterBox
            key={index}
            letter={letter}
            green={hasCorrectLocation && hasCorrectLetter && revealed}
            yellow={hasCorrectLetter && !hasCorrectLocation && revealed}
          />
        );
      })}
    </div>
  );
}

interface LetterBoxProps {
  letter: string;
  green: boolean;
  yellow: boolean;
}

function LetterBox({ letter, green, yellow }: LetterBoxProps) {
  const boxColor = green
    ? "bg-green-500"
    : yellow
      ? "bg-yellow-500"
      : "bg-white";

  return (
    <div
      className={`w-12 md:w-[62px] h-12 md:h-[62px] border-2 border-gray-300 text-black text-3xl font-bold flex items-center justify-center ${boxColor}`}
    >
      {letter}
    </div>
  );
}

function Wordle() {
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetterObject, setCorrectLetterObject] = useState<
    Record<string, number>
  >({});
  const [guessWords, setGuessWords] = useState<string[]>(
    new Array(TOTAL_GUESSES).fill("     ")
  );
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentWord, setCurrentWord] = useState("     ");
  const [gameOver, setGameOver] = useState(false);
  const gameOverRef = useRef(gameOver);
  const wordCountRef = useRef(wordCount);
  const letterCountRef = useRef(letterCount);
  const currentWordRef = useRef(currentWord);
  const correctWordRef = useRef(correctWord);
  // Sync state to refs
  useEffect(() => {
    wordCountRef.current = wordCount;
    letterCountRef.current = letterCount;
    currentWordRef.current = currentWord;
  }, [wordCount, letterCount, currentWord]);

  // Getting Correct word
  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * fiveLetterAmharicWords.length
    );

    const word = fiveLetterAmharicWords[randomIndex];

    const letterObject: Record<string, number> = {};
    for (const letter of word) {
      letterObject[letter] = (letterObject[letter] || 0) + 1;
    }
    setCorrectWord(word);
    setCorrectLetterObject(letterObject);
  }, []);

  function handleAlphabetical(key: string) {
    if (letterCountRef.current === WORD_LENGTH) return;

    const updated = currentWordRef.current.split("");
    updated[letterCountRef.current] = key;
    const newWord = updated.join("");

    setCurrentWord(newWord);
    setLetterCount((prev) => prev + 1);
  }

  function handleEnter() {
    if (currentWordRef.current === correctWordRef.current) {
      setGameOver(true);
      alert(`you have won!!!!`);
      return;
    }

    if (
      currentWordRef.current !== correctWordRef.current &&
      wordCountRef.current === TOTAL_GUESSES - 1
    ) {
      setGameOver(true);
      alert(`you have lost`);
      return;
    }
    if (
      letterCountRef.current !== WORD_LENGTH ||
      wordCountRef.current >= TOTAL_GUESSES
    ) {
      alert("Words must be five letters or less than 6 guesses");
      return;
    }

    setGuessWords((current) => {
      const updated = [...current];
      updated[wordCountRef.current] = currentWordRef.current;
      return updated;
    });
    setWordCount((prev) => prev + 1);
    setLetterCount(0);
    setCurrentWord("     ");
  }

  function handleBackspace() {
    if (letterCountRef.current === 0) return;

    const updated = currentWordRef.current.split("");
    updated[letterCountRef.current - 1] = " ";
    const newWord = updated.join("");

    setCurrentWord(newWord);
    setLetterCount((prev) => prev - 1);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        handleEnter();
      } else if (e.key === "Backspace") {
        handleBackspace();
      }
    }

    if (gameOverRef.current) {
      document.addEventListener("keydown", handleKeyDown);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden items-center justify-center">
      <div className="border-b-2 w-full flex items-center justify-between px-2 border-gray-300">
        <div className="flex flex-col py-1">
          <h2 className="font-extrabold border-2 rounded-md px-2 mt-1 w-fit">
            AS
          </h2>
          <span className="text-xs">adey.space</span>
        </div>
        <button className="font-extrabold">Leader board</button>
      </div>
      {/* Scrollable Word List Area */}
      <div className="flex-1 overflow-hidden p-2 mt-4 ">
        {guessWords.map((word, index) => {
          if (index === wordCount) {
            return (
              <WordLine
                correctWord={correctWord}
                correctLetterObject={correctLetterObject}
                revealed={false || gameOver}
                word={currentWord}
                key={index}
              />
            );
          }
          return (
            <WordLine
              correctWord={correctWord}
              correctLetterObject={correctLetterObject}
              revealed={true}
              key={index}
              word={word}
            />
          );
        })}
      </div>

      {/* Fixed Keyboard at Bottom */}
      <div className="fixed md:relative bottom-0 z-10 py-1">
        <AmharicKeyboard
          onKeyPress={(key) => handleAlphabetical(key)}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
        />
      </div>
    </div>
  );
}

export default Wordle;

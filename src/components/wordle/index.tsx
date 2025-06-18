import React, { useState, useEffect, useRef } from "react";
import AmharicKeyboard from "./amharic-keyboard";
import {
  fiveLetterAmharicWords,
  fourLetterAmharicWords,
} from "./fiveLetterAmharicWords";

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

        return (
          <LetterBox
            key={index}
            letter={letter}
            green={hasCorrectLocation && hasCorrectLetter && revealed}
            yellow={hasCorrectLetter && !hasCorrectLocation && revealed}
            gray={
              !hasCorrectLetter && !hasCorrectLocation && isFilled && revealed
            }
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
  gray: boolean;
}

function LetterBox({ letter, green, yellow, gray }: LetterBoxProps) {
  const boxColor = gray
    ? "bg-gray-300 !border-none"
    : green
      ? "bg-green-500 !border-none"
      : yellow
        ? "bg-yellow-500 !border-none"
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
  const letterPlacholderlevel4 = "    ";
  const letterPlacholderlevel5 = "     ";
  const [level, setlevel] = useState(4);
  const [correctWord, setCorrectWord] = useState("");
  const [correctLetterObject, setCorrectLetterObject] = useState<
    Record<string, number>
  >({});
  const [guessWords, setGuessWords] = useState<string[]>(
    new Array(TOTAL_GUESSES).fill(
      level === 4 ? letterPlacholderlevel4 : letterPlacholderlevel5
    )
  );
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentWord, setCurrentWord] = useState(
    level === 4 ? letterPlacholderlevel4 : letterPlacholderlevel5
  );
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
    const currentLevel =
      level === 4 ? fourLetterAmharicWords : fiveLetterAmharicWords;
    const randomIndex = Math.floor(Math.random() * currentLevel.length);

    const word = currentLevel[randomIndex];

    const letterObject: Record<string, number> = {};
    for (const letter of word) {
      letterObject[letter] = (letterObject[letter] || 0) + 1;
    }
    setCorrectWord(word);
    setCorrectLetterObject(letterObject);
  }, [level]);

  function handleAlphabetical(key: string) {
    if (letterCountRef.current === level) return;

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
      letterCountRef.current !== level ||
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
    setCurrentWord(
      level === 4 ? letterPlacholderlevel4 : letterPlacholderlevel5
    );
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
        <div className="space-x-2">
          <select
            className="border-1 rounded-md font-extrabold border-gray-400 px-2 mt-2"
            onChange={(e) => {
              setlevel(+e.target.value);
              setGuessWords(
                new Array(TOTAL_GUESSES).fill(
                  +e.target.value === 4
                    ? letterPlacholderlevel4
                    : letterPlacholderlevel5
                )
              );
              setCurrentWord(
                +e.target.value === 4
                  ? letterPlacholderlevel4
                  : letterPlacholderlevel5
              );
            }}
            value={level}
          >
            <option value="4">4 Letter</option>
            <option value="5">5 Letter</option>
          </select>
          {/* <button className="font-extrabold">Leader board</button> */}
        </div>
      </div>

      {/* Scrollable Word List Area */}
      <div className="flex-1 overflow-hidden p-2 mt-2">
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

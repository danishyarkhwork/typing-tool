"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { nanoid } from "nanoid";

// Sentence lists for different difficulty levels
const sentenceLists: Record<"easy" | "normal" | "hard", string[]> = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "I love to code every day.",
    "The sun is shining brightly.",
    "Type fast to win the race.",
    "React is a great library.",
  ],
  normal: [
    "The quick brown fox jumps over the lazy dog, and then it runs away.",
    "I love to code every day, especially in JavaScript.",
    "The sun is shining brightly in the clear blue sky.",
    "Type fast to win the race against time and beat your own score.",
    "React is a great library for building dynamic user interfaces.",
  ],
  hard: [
    "The quick brown fox jumps over the lazy dog, and then it runs away, never to be seen again.",
    "I love to code every day, especially in JavaScript, because it is so versatile and powerful.",
    "The sun is shining brightly in the clear blue sky, casting long shadows on the ground.",
    "Type fast to win the race against time, beat your own score, and improve your typing skills.",
    "React is a great library for building dynamic user interfaces, allowing developers to create complex apps with ease.",
  ],
};

type Level = {
  id: string;
  sentence: string;
};

const TypeRacerGame: React.FC = () => {
  const [input, setInput] = useState("");
  const [currentSentence, setCurrentSentence] = useState<Level | null>(null);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("normal");
  const [timeTaken, setTimeTaken] = useState(0);
  const [highScores, setHighScores] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && currentSentence) {
      startTimeRef.current = Date.now(); // Start the timer
    }
  }, [isPlaying, currentSentence]);

  const generateNewSentence = useCallback(() => {
    const sentenceList =
      sentenceLists[difficulty as "easy" | "normal" | "hard"];
    const newSentence =
      sentenceList[Math.floor(Math.random() * sentenceList.length)];
    return { id: nanoid(), sentence: newSentence };
  }, [difficulty]);

  useEffect(() => {
    if (isPlaying) {
      setCurrentSentence(generateNewSentence());
      setInput(""); // Clear the input field
      setTimeTaken(0); // Reset the timer for each level
      setProgress(0); // Reset progress bar
      setErrors(0); // Reset errors
      setAccuracy(100); // Reset accuracy
    }
  }, [isPlaying, level, generateNewSentence]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);

      if (currentSentence) {
        const currentText = currentSentence.sentence.substring(0, value.length);
        const isCorrect = value === currentText;

        setProgress(
          Math.min((value.length / currentSentence.sentence.length) * 100, 100)
        );

        if (!isCorrect) {
          setErrors((prevErrors) => prevErrors + 1);
        }

        setAccuracy(
          Math.max(0, 100 - (errors / currentSentence.sentence.length) * 100)
        );

        if (value === currentSentence.sentence) {
          const endTime = Date.now();
          const timeSpent = (endTime - (startTimeRef.current || 0)) / 1000; // Calculate time taken in seconds
          setTimeTaken(timeSpent);
          setScore(
            (prevScore) => prevScore + Math.max(0, Math.floor(1000 / timeSpent))
          ); // Score is higher for faster typing
          setLevel((prevLevel) => prevLevel + 1);
          setStreak((prevStreak) => prevStreak + 1);
          setProgress(100);
        }
      }
    },
    [currentSentence, errors]
  );

  const handleStart = useCallback(() => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setInput("");
    setTimeTaken(0);
    setProgress(0);
    setStreak(0);
    setAccuracy(100);
  }, []);

  const handleRestart = useCallback(() => {
    handleStart();
  }, [handleStart]);

  const handleDifficultyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDifficulty(e.target.value);
    },
    []
  );

  return (
    <div className="game-container relative h-screen w-full flex justify-center items-center bg-gray-800 text-white">
      {/* Main Configuration Page */}
      {!isPlaying && !gameOver && (
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center space-y-6 z-20 max-w-lg mx-auto">
          <h1 className="text-4xl font-bold">Type Racer Game</h1>
          <p className="text-lg">
            Improve your typing skills and race against the clock!
          </p>
          <div className="flex flex-col space-y-4 text-lg">
            <div className="flex justify-between items-center">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={handleDifficultyChange}
                className="p-2 bg-gray-800 border-2 border-gray-600 rounded text-white"
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button
              onClick={handleStart}
              className="mt-6 p-4 bg-blue-600 rounded-lg text-white shadow-lg w-full hover:bg-blue-700 transition duration-300"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center space-y-6 z-20 max-w-lg mx-auto">
          <h2 className="text-4xl font-bold text-red-500">Game Over</h2>
          <p className="text-xl">Final Score: {score}</p>
          <button
            onClick={handleRestart}
            className="mt-4 p-4 bg-blue-600 rounded-lg text-white shadow-lg w-full hover:bg-blue-700 transition duration-300"
          >
            Start Again
          </button>
        </div>
      )}

      {/* Game Play Area */}
      {isPlaying && !gameOver && (
        <div className="relative w-full h-full flex flex-col justify-center items-center space-y-8">
          <h2 className="text-3xl font-bold mb-4 animate-pulse">
            Level {level}
          </h2>
          <div className="text-2xl font-mono bg-gray-700 p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 max-w-4xl mx-auto">
            <span className="whitespace-pre-line">
              {currentSentence?.sentence.split("").map((char, idx) => (
                <span
                  key={idx}
                  className={`${
                    input[idx] === char
                      ? "text-green-400"
                      : input[idx]
                      ? "text-red-500"
                      : "text-gray-300"
                  }`}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
          <div className="flex-grow text-center w-full max-w-xl">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="w-full p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-xl focus:outline-none focus:border-blue-500"
              placeholder="Type the sentence..."
              autoFocus
              disabled={!isPlaying}
              style={{ width: "100%" }}
            />
            <div className="relative w-full h-2 mt-4 bg-gray-700 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 transition-width duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="fixed bottom-4 left-4 text-xl text-white">
            Time: {timeTaken.toFixed(2)}s
          </div>
          <div className="fixed bottom-4 right-4 text-xl text-white">
            Score: {score}
          </div>
          <div className="fixed bottom-16 left-4 text-xl text-white">
            Streak: {streak}
          </div>
          <div className="fixed bottom-16 right-4 text-xl text-white">
            Accuracy: {accuracy.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TypeRacerGame);

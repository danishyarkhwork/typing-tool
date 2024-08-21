"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { nanoid } from "nanoid";

// Word lists for different languages
const wordLists = {
  english: [
    "cat",
    "dog",
    "house",
    "apple",
    "computer",
    "keyboard",
    "javascript",
    "react",
    "typescript",
    "tailwind",
  ],
  pashto: [
    "کتاب",
    "کور",
    "موټر",
    "سیب",
    "کمپیوټر",
    "کیبورډ",
    "پروګرام",
    "جاواسکریپټ",
    "ریاکت",
    "ټایپ سکریپټ",
  ],
};

// Word type definition
type Word = {
  id: string;
  text: string;
  top: number;
  left: number;
};

const WordFallGame: React.FC = () => {
  const [input, setInput] = useState("");
  const [words, setWords] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [fallSpeed, setFallSpeed] = useState(5);
  const [difficulty, setDifficulty] = useState("normal");
  const [gameDuration, setGameDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [highScores, setHighScores] = useState<number[]>([]);
  const [language, setLanguage] = useState("english");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let gameInterval: NodeJS.Timeout;
    let fallInterval: NodeJS.Timeout;

    if (isPlaying) {
      setGameOver(false); // Ensure game over is reset when starting

      gameInterval = setInterval(
        () => {
          const newWord: Word = {
            id: nanoid(),
            text: generateRandomWord(),
            top: 0,
            left: Math.random() * 80 + 10,
          };
          setWords((prevWords) => [...prevWords, newWord]);
        },
        difficulty === "easy" ? 3000 : difficulty === "hard" ? 1200 : 2000
      );

      fallInterval = setInterval(() => {
        setWords((prevWords) =>
          prevWords.map((word) => ({
            ...word,
            top: word.top + fallSpeed,
          }))
        );
      }, 100);

      const timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsPlaying(false);
            setGameOver(true);
            clearInterval(gameInterval);
            clearInterval(fallInterval);
            setHighScores(
              [...highScores, score].sort((a, b) => b - a).slice(0, 5)
            );
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(gameInterval);
        clearInterval(fallInterval);
        clearInterval(timerInterval);
      };
    }
  }, [isPlaying, fallSpeed, gameDuration, difficulty, score, highScores]);

  useEffect(() => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    setWords((prevWords) => {
      const filteredWords = prevWords.filter((word) => {
        if (word.top >= containerHeight - 50) {
          setMissed((prevMissed) => prevMissed + 1);
          setStreak(0); // Reset streak on miss
          return false;
        }
        return true;
      });
      return filteredWords;
    });
  }, [words]);

  const generateRandomWord = useCallback(() => {
    const wordList = wordLists[language];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }, [language]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);

      const matchIndex = words.findIndex((word) => word.text === value.trim());
      if (matchIndex > -1) {
        setScore((prevScore) => prevScore + 1);
        setStreak((prevStreak) => prevStreak + 1);
        setWords((prevWords) => prevWords.filter((_, i) => i !== matchIndex));
        setInput("");
      }
    },
    [words]
  );

  const handleStartPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setTimeLeft(gameDuration); // Reset the timer
      setScore(0);
      setMissed(0);
      setStreak(0);
      setWords([]); // Clear words when starting a new game
    }
  }, [isPlaying, gameDuration]);

  const handleSpeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFallSpeed(parseInt(e.target.value));
    },
    []
  );

  const handleDurationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const duration = parseInt(e.target.value);
      setGameDuration(duration);
      setTimeLeft(duration);
    },
    []
  );

  const handleDifficultyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDifficulty(e.target.value);
    },
    []
  );

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
    },
    []
  );

  const handleRestart = () => {
    setGameOver(false);
    setIsPlaying(false);
    setInput("");
  };

  return (
    <div
      className="relative h-screen bg-gradient-to-b from-gray-800 to-gray-600 text-white overflow-hidden flex flex-col items-center justify-center"
      ref={containerRef}
    >
      {/* Main Configuration Page */}
      {!isPlaying && !gameOver && (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center space-y-6 z-10">
          <h1 className="text-3xl font-bold">WordFall Typing Game</h1>
          <div className="flex flex-col space-y-4 text-lg">
            <div className="flex justify-between items-center">
              <label htmlFor="speed">Speed:</label>
              <input
                id="speed"
                type="range"
                min="1"
                max="10"
                value={fallSpeed}
                onChange={handleSpeedChange}
                className="slider"
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="duration">Duration:</label>
              <select
                id="duration"
                value={gameDuration}
                onChange={handleDurationChange}
                className="p-2 bg-gray-800 border-2 border-gray-600 rounded text-white"
              >
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={120}>2 minutes</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>
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
            <div className="flex justify-between items-center">
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                value={language}
                onChange={handleLanguageChange}
                className="p-2 bg-gray-800 border-2 border-gray-600 rounded text-white"
              >
                <option value="english">English</option>
                <option value="pashto">Pashto</option>
              </select>
            </div>
            <button
              onClick={handleStartPause}
              className="mt-6 p-3 bg-blue-500 rounded text-white shadow-lg w-full"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center space-y-6 z-10">
          <h2 className="text-3xl font-bold text-red-500">Game Over</h2>
          <p className="text-xl">Score: {score}</p>
          <p className="text-xl">Missed: {missed}</p>
          <p className="text-xl">Streak: {streak}</p>
          <p className="text-xl">Time Left: {timeLeft}s</p>
          <button
            onClick={handleRestart}
            className="mt-4 p-3 bg-blue-500 rounded text-white shadow-lg w-full"
          >
            Start Again
          </button>
        </div>
      )}

      {/* Game Play Area */}
      {isPlaying && !gameOver && (
        <>
          {words.map((word) => (
            <div
              key={word.id}
              style={{ top: `${word.top}px`, left: `${word.left}%` }}
              className="absolute text-2xl font-bold animate-bounce z-0"
            >
              {word.text}
            </div>
          ))}

          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-md p-4 flex justify-between items-center text-white z-10">
            {/* Left Section: Score, Missed, Streak, Time Left */}
            <div className="flex space-x-4 text-xl">
              <p>Score: {score}</p>
              <p>Missed: {missed}</p>
              <p>Streak: {streak}</p>
              <p>Time Left: {timeLeft}s</p>
            </div>

            {/* Center Section: Input Field */}
            <div className="flex-grow text-center">
              <input
                type="text"
                value={input}
                onChange={handleChange}
                className="w-full max-w-lg p-3 bg-gray-800 border-2 border-gray-600 rounded text-xl focus:outline-none focus:border-blue-500 mx-auto"
                placeholder="Type the word..."
                autoFocus
                disabled={!isPlaying}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(WordFallGame);

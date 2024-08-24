"use client";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { nanoid } from "nanoid";
import useSound from "use-sound";

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

type Language = keyof typeof wordLists;

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
  const [language, setLanguage] = useState<Language>("english");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 });

  const generateRandomWord = useCallback(() => {
    const wordList = wordLists[language];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }, [language]);

  useEffect(() => {
    if (isPlaying) {
      setGameOver(false);

      const gameInterval = setInterval(
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

      const fallInterval = setInterval(() => {
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
  }, [
    isPlaying,
    fallSpeed,
    gameDuration,
    difficulty,
    score,
    highScores,
    generateRandomWord,
  ]);

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      playTypingSound();

      const matchIndex = words.findIndex((word) => word.text === value.trim());
      if (matchIndex > -1) {
        setScore((prevScore) => prevScore + 1);
        setStreak((prevStreak) => prevStreak + 1);
        setWords((prevWords) => prevWords.filter((_, i) => i !== matchIndex));
        setInput("");
      }
    },
    [words, playTypingSound]
  );

  const handleStartPause = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setTimeLeft(gameDuration);
      setScore(0);
      setMissed(0);
      setStreak(0);
      setWords([]);
    }
  }, [isPlaying, gameDuration]);

  const handleRestart = () => {
    setGameOver(false);
    setIsPlaying(false);
    setInput("");
  };

  return (
    <div
      className="relative bg-gradient-to-b from-blue-100 via-slate-200 to-white text-gray-900 min-h-screen flex flex-col items-center pt-20 pb-12"
      ref={containerRef}
    >
      {!isPlaying && !gameOver && (
        <div className="p-6 rounded-lg shadow-lg text-center space-y-6 z-10">
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
                onChange={(e) => setFallSpeed(parseInt(e.target.value))}
                className="slider"
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="duration">Duration:</label>
              <select
                id="duration"
                value={gameDuration}
                onChange={(e) => {
                  const duration = parseInt(e.target.value);
                  setGameDuration(duration);
                  setTimeLeft(duration);
                }}
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
                onChange={(e) => setDifficulty(e.target.value)}
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
                onChange={(e) => setLanguage(e.target.value as Language)}
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

      {gameOver && (
        <div className="p-6 rounded-lg shadow-lg text-center space-y-6 z-10">
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

      {isPlaying && !gameOver && (
        <>
          {words.map((word) => (
            <div
              key={word.id}
              style={{ top: `${word.top}px`, left: `${word.left}%` }}
              className="absolute text-2xl font-bold z-10"
            >
              {word.text}
            </div>
          ))}

          <div className="fixed bottom-0 max-w-6xl w-full bg-gray-900 p-6 rounded-t-xl shadow-2xl text-white z-10 flex flex-col items-center space-y-4 border-t border-gray-700">
            <div className="flex w-full text-md text-center space-x-4 items-center">
              <div className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-blue-400 font-semibold">Score: </span>
                <span className="ml-1">{score}</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-red-400 font-semibold">Missed: </span>
                <span className="ml-1">{missed}</span>
              </div>
              <div className="flex-grow mx-4">
                <input
                  type="text"
                  value={input}
                  onChange={handleChange}
                  className="w-full text-lg p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300 shadow-md"
                  placeholder="Type the word..."
                  autoFocus
                  disabled={!isPlaying}
                />
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-green-400 font-semibold">Streak: </span>
                <span className="ml-1">{streak}</span>
              </div>
              <div className="bg-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-yellow-400 font-semibold">
                  Time Left:{" "}
                </span>
                <span className="ml-1">{timeLeft}s</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(WordFallGame);

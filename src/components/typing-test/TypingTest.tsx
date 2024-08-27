"use client";

import React, { useState, useEffect, useRef } from "react";
import "@/styles/typing-test-page.css";
import useSound from "use-sound";

// Define type for languageWords
type WordLists = {
  easy: string[];
  medium: string[];
  complex: string[];
};

type Languages = {
  english: WordLists;
  pashto: WordLists;
};

// Language word lists
const languageWords: Languages = {
  english: {
    easy: [
      "cat",
      "dog",
      "book",
      "house",
      "car",
      "tree",
      "apple",
      "happy",
      "run",
      "jump",
      "play",
      "walk",
      "sun",
      "moon",
      "star",
      "blue",
      "red",
      "green",
      "yellow",
      "big",
      "small",
      "fast",
      "slow",
      "hot",
      "cold",
      "new",
      "old",
      "good",
      "bad",
      "yes",
      "no",
      "and",
      "or",
      "but",
      "if",
      "the",
      "is",
      "in",
      "on",
      "it",
      "to",
      "he",
      "she",
    ],
    medium: [
      "beautiful",
      "quickly",
      "understand",
      "bicycle",
      "mountain",
      "kitchen",
      "elephant",
      "conversation",
      "puzzle",
      "garden",
      "holiday",
      "balloon",
      "umbrella",
      "yesterday",
      "tomorrow",
      "library",
      "excited",
      "adventure",
      "enormous",
      "delicious",
      "whisper",
      "thunder",
      "river",
      "ocean",
      "sandwich",
      "butterfly",
      "treasure",
      "important",
      "remember",
      "family",
      "friend",
      "happy",
      "lucky",
      "quiet",
      "loud",
      "perfect",
      "wonderful",
      "knowledge",
      "curious",
    ],
    complex: [
      "extraterrestrial",
      "metamorphosis",
      "quantum",
      "psychology",
      "philosophy",
      "anthropology",
      "astronomy",
      "biochemistry",
      "neuroscience",
      "microbiology",
      "paleontology",
      "epistemology",
      "sociolinguistics",
      "hydrodynamics",
      "thermodynamics",
      "photosynthesis",
      "electromagnetism",
      "cybersecurity",
      "cryptography",
      "nanotechnology",
      "biotechnology",
      "astrobiology",
      "astrophysics",
      "geophysics",
      "quantum mechanics",
      "relativity",
      "string theory",
      "superconductivity",
      "bioinformatics",
      "biostatistics",
      "neuropsychology",
      "psychopharmacology",
      "epidemiology",
      "virology",
      "immunology",
      "pathophysiology",
      "histopathology",
      "psychopathology",
      "parapsychology",
      "metaphysics",
      "hermeneutics",
    ],
  },
  pashto: {
    easy: [
      "کتاب",
      "کور",
      "موټر",
      "سیب",
      "لوی",
      "خوشحاله",
      "منډه",
      "ټوپ",
      "لوبه",
    ],
    medium: [
      "ښکلی",
      "ګړندی",
      "پوهیدل",
      "بایسکل",
      "غر",
      "پخلنځی",
      "پيل",
      "خبره",
    ],
    complex: [
      "فلسفه",
      "انسان پېژندنه",
      "ساینس",
      "نفس پوهه",
      "هیدرودینامیک",
      "ژبپوهنه",
      "الکترومقناطیس",
      "پراسرار",
      "فوق العاده",
      "زیږنتون",
    ],
  },
};

const generateRandomWords = (num: number, wordList: string[]) => {
  return Array.from(
    { length: num },
    () => wordList[Math.floor(Math.random() * wordList.length)]
  );
};

const TypingTest: React.FC = () => {
  const [text, setText] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [history, setHistory] = useState<{ wpm: number; accuracy: number }[]>(
    []
  );
  const [leaderboard, setLeaderboard] = useState<
    { wpm: number; accuracy: number }[]
  >([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [language, setLanguage] = useState("english");
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsPerPage = 20;

  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 });

  useEffect(() => {
    setText(generateRandomWords(100, getWordList(difficulty, language)));
  }, [difficulty, language]);

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      calculateResults();
      setIsTyping(false);
      setGameOver(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTyping, timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTyping) setIsTyping(true);
    const value = e.target.value;

    console.log("Typing sound should play now."); // Debugging line
    playTypingSound(); // Play sound

    if (value.endsWith(" ")) {
      const trimmedValue = value.trim();
      if (trimmedValue !== text[currentIndex]) {
        setErrors(errors + 1);
      } else {
        setCorrectWords(correctWords + 1);
      }
      setTypedWords([...typedWords, trimmedValue]);
      setInput("");
      setCurrentIndex(currentIndex + 1);
    } else {
      setInput(value);
    }
    highlightNextWord(value);
  };

  const highlightNextWord = (currentInput: string) => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll("span");
      words.forEach((word, index) => {
        word.classList.remove(
          "bg-gray-200",
          "dark:bg-gray-600",
          "text-green-500",
          "text-red-500"
        );
        if (index === currentIndex) {
          if (
            currentInput.trim() !==
            text[currentIndex].substring(0, currentInput.trim().length)
          ) {
            word.classList.add("text-red-500");
          } else {
            word.classList.add(
              "bg-gray-200",
              "dark:bg-gray-600",
              "px-1",
              "rounded"
            );
          }
        } else if (index < currentIndex) {
          if (typedWords[index] !== text[index]) {
            word.classList.add("text-red-500");
          } else {
            word.classList.add("text-green-500");
          }
        }
      });
    }
  };

  const calculateResults = () => {
    const correctWordsCount = typedWords.filter(
      (word, index) => word === text[index]
    ).length;
    const totalMinutes = (selectedTime - timeLeft) / 60;
    const wpm = Math.round(correctWordsCount / totalMinutes);
    const accuracy = ((correctWordsCount / typedWords.length) * 100).toFixed(2);
    setWpm(wpm);
    setAccuracy(parseFloat(accuracy));

    const result = { wpm, accuracy: parseFloat(accuracy) };
    setHistory((prev) =>
      prev.some(
        (entry) =>
          entry.wpm === result.wpm && entry.accuracy === result.accuracy
      )
        ? prev
        : [...prev, result]
    );
    setLeaderboard((prev) =>
      prev.some(
        (entry) =>
          entry.wpm === result.wpm && entry.accuracy === result.accuracy
      )
        ? prev
        : [...prev, result].sort((a, b) => b.wpm - a.wpm).slice(0, 10)
    );
  };

  const handleRestart = () => {
    setText(generateRandomWords(100, getWordList(difficulty, language)));
    setInput("");
    setIsTyping(false);
    setTimeLeft(selectedTime);
    setWpm(null);
    setAccuracy(null);
    setTypedWords([]);
    setErrors(0);
    setCorrectWords(0);
    setCurrentIndex(0);
    setGameOver(false);
  };

  const handleStartTest = () => {
    setIsTyping(true);
    setTimeLeft(selectedTime);
    setGameOver(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const time = parseInt(e.target.value);
    setSelectedTime(time);
    setTimeLeft(time);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const getWordList = (difficulty: string, language: string) => {
    return languageWords[language as keyof Languages][
      difficulty as keyof WordLists
    ];
  };

  useEffect(() => {
    highlightNextWord("");
  }, [typedWords, currentIndex]);

  return (
    <div className="p-6 max-w-5xl mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8">
      {/* Settings Section */}
      {!isTyping && !gameOver && (
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Typing Test Settings
          </h1>
          <div className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0">
            <div className="relative">
              <label className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Time:
              </label>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={120}>120 seconds</option>
              </select>
            </div>

            <div className="relative">
              <label className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Difficulty:
              </label>
              <select
                value={difficulty}
                onChange={handleDifficultyChange}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="complex">Complex</option>
              </select>
            </div>

            <div className="relative">
              <label className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                Language:
              </label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="english">English</option>
                <option value="pashto">Pashto</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleStartTest}
            className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Start Test
          </button>
        </div>
      )}

      {/* Game Over Section */}
      {gameOver && (
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold text-green-500">{wpm} WPM</h2>
          <div className="text-2xl">
            Keystrokes:{" "}
            <span className="text-green-500">
              {typedWords.join("").length + typedWords.length - 1}
            </span>{" "}
            | Errors: <span className="text-red-500">{errors}</span>
          </div>
          <div className="text-2xl">Accuracy: {accuracy}%</div>
          <div className="text-2xl">
            Correct words:{" "}
            <span className="text-green-500">{correctWords}</span>
          </div>
          <div className="text-2xl">
            Wrong words: <span className="text-red-500">{errors}</span>
          </div>

          <button
            onClick={handleRestart}
            className="p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mt-4"
          >
            Restart Test
          </button>
        </div>
      )}

      {/* Typing Area */}
      {isTyping && !gameOver && (
        <>
          <div
            id="words"
            className={`text-4xl font-semibold font-mono whitespace-pre-wrap leading-relaxed tracking-wide ${
              language === "pashto" ? "text-right" : "text-left"
            } relative p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner`}
            dir={language === "pashto" ? "rtl" : "ltr"}
            ref={textRef}
          >
            {text.slice(0, currentIndex + wordsPerPage).map((word, index) => {
              const absoluteIndex = index;
              const wordClass =
                typedWords[absoluteIndex] &&
                typedWords[absoluteIndex] === text[absoluteIndex]
                  ? "text-green-600 font-bold"
                  : typedWords[absoluteIndex]
                  ? "text-red-600 font-bold"
                  : "text-gray-700 dark:text-gray-300";
              return (
                <span
                  key={index}
                  className={`${
                    absoluteIndex === currentIndex
                      ? "bg-blue-200 dark:bg-blue-700 px-2 py-1 rounded transition-colors duration-300"
                      : wordClass
                  } mr-2`}
                >
                  {word}{" "}
                </span>
              );
            })}
          </div>

          <input
            type="text"
            value={input}
            onChange={handleChange}
            className={`w-full p-3 mt-4 border border-gray-300 dark:border-gray-600 rounded-lg text-4xl font-mono bg-gray-100 dark:bg-gray-700 ${
              language === "pashto" ? "text-right" : "text-left"
            }`}
            placeholder={
              language === "pashto"
                ? "دلته ټایپ کول پیل کړئ ..."
                : "Start typing here..."
            }
            disabled={timeLeft === 0}
            dir={language === "pashto" ? "rtl" : "ltr"}
            autoFocus
          />
          <div className="flex justify-between items-center text-gray-900 dark:text-gray-200 mt-4">
            <div className="text-2xl">Time Left: {timeLeft}s</div>
            {wpm !== null && <div className="text-2xl">WPM: {wpm}</div>}
            {accuracy !== null && (
              <div className="text-2xl">Accuracy: {accuracy}%</div>
            )}
          </div>
        </>
      )}

      {/* Typing History and Leaderboard */}
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Typing History</h2>
          <ul className="list-disc list-inside space-y-1">
            {history.map((entry, index) => (
              <li key={index}>
                WPM: {entry.wpm}, Accuracy: {entry.accuracy}%
              </li>
            ))}
          </ul>
        </div>
      )}
      {leaderboard.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Leaderboard</h2>
          <ul className="list-disc list-inside space-y-1">
            {leaderboard.map((entry, index) => (
              <li key={index}>
                WPM: {entry.wpm}, Accuracy: {entry.accuracy}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TypingTest;

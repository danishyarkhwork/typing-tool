"use client";

import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { useWindowSize } from "react-use";

const textSamples = {
  easy: {
    english: "The cat sat on the mat.",
    pashto: "پشۍ په توشک ناست و.",
  },
  medium: {
    english:
      "Oil and water don't mix. You have probably heard this old saying.",
    pashto: "تیل او اوبه یوځای نشي. تاسو به شاید دا زوړ خبره اورېدلې وي.",
  },
  hard: {
    english: `Oil and water don't mix. You have probably heard this old saying. It isn't just folk wisdom, however. It's chemistry. Another common expression, "like water off of a duck's back," illustrates the same basic principle.`,
    pashto: `تیل او اوبه یوځای نشي. تاسو به شاید دا زوړ خبره اورېدلې وي. دا یوازې ولسي حکمت نه دی، بلکې دا کیمیا ده. بله عامه وینا، "لکه څنګه چې اوبه د وزې څخه د غوړېدلې شوې اوبه،" ورته اساسي اصول څرګندوي.`,
  },
};

const pashtoKeyboard = {
  row1: "ض ص ث ق ف غ ع ه خ ح ج چ".split(" "),
  row2: "ش س ی ب ل ا ت ن م ک گ".split(" "),
  row3: "ط ظ ز ژ ږ پ و ۍ د ر ذ".split(" "),
};

type Difficulty = keyof typeof textSamples;
type Language = keyof (typeof textSamples)[Difficulty];

const AdvanceTypingTest = () => {
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [language, setLanguage] = useState<Language>("english");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [showSettings, setShowSettings] = useState(true);
  const [achievement, setAchievement] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 });
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (showSettings) return;
    const selectedText = textSamples[difficulty][language];
    setWords(selectedText.split(" "));
    setCurrentWord(selectedText.split(" ")[0]);
  }, [language, difficulty, showSettings]);

  useEffect(() => {
    if (isTyping) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTyping]);

  useEffect(() => {
    if (isCompleted) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      calculateAchievements();
    } else {
      calculateWpm();
    }
  }, [isCompleted, correctWords.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    playTypingSound();
    setInput(value);

    if (!isTyping) {
      setIsTyping(true);
    }

    if (value.trim() === currentWord) {
      setCorrectWords([...correctWords, currentWord]);
      setInput("");
      setWordIndex((prev) => prev + 1);
      setCurrentWord(words[wordIndex + 1]);
      if (wordIndex + 1 === words.length) {
        setIsCompleted(true);
      }
    } else if (value.length >= currentWord.length) {
      setErrors((prev) => prev + 1);
    }

    calculateAccuracy();
  };

  const calculateWpm = () => {
    const minutes = timer / 60;
    const wordsTyped = correctWords.length;
    if (minutes > 0) {
      setWpm(Math.round(wordsTyped / minutes));
    }
  };

  const calculateAccuracy = () => {
    const totalTyped = correctWords.join(" ").length + input.length + errors;
    const accuracy = Math.max(
      0,
      (correctWords.join(" ").length / totalTyped) * 100
    );
    setAccuracy(accuracy);
  };

  const restartTest = () => {
    setInput("");
    setWordIndex(0);
    setCorrectWords([]);
    setCurrentWord(words[0]);
    setIsTyping(false);
    setTimer(0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setAchievement("");
    setIsCompleted(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShowSettings(true);
  };

  const calculateAchievements = () => {
    if (wpm > 100) {
      setAchievement("Master Typist! 🏆");
    } else if (wpm > 60) {
      setAchievement("Speed Typist! 🚀");
    } else {
      setAchievement("Keep Practicing! 💪");
    }
  };

  const renderText = () => {
    return words.map((word, index) => {
      const isCurrentWord = index === wordIndex;
      const isCorrect =
        correctWords.includes(word) && correctWords.indexOf(word) === index;

      return (
        <span
          key={index}
          className={`mx-1 p-1 rounded leading-relaxed mb-2 ${
            isCorrect
              ? "bg-green-500 text-white"
              : isCurrentWord
              ? "bg-blue-500 text-white"
              : "text-gray-600"
          }`}
        >
          {word}
        </span>
      );
    });
  };

  const startGame = () => {
    setShowSettings(false);
    setIsTyping(false);
  };

  const renderKeyboard = () => {
    if (!currentWord) return null;

    const nextChar = currentWord.charAt(input.length);
    const isUpperCase = nextChar === nextChar.toUpperCase();

    const keysRow1 =
      language === "pashto" ? pashtoKeyboard.row1 : "QWERTYUIOP".split("");
    const keysRow2 =
      language === "pashto" ? pashtoKeyboard.row2 : "ASDFGHJKL".split("");
    const keysRow3 =
      language === "pashto" ? pashtoKeyboard.row3 : "ZXCVBNM".split("");

    const renderKeys = (keys: string[]) => {
      return keys.map((key) => {
        const displayKey = isUpperCase ? key.toUpperCase() : key.toLowerCase();
        const isActive = input.slice(-1).toUpperCase() === key.toUpperCase();
        const isNextKey = nextChar.toUpperCase() === key.toUpperCase();

        return (
          <span
            key={key}
            className={`p-4 m-2 rounded text-2xl ${
              isActive
                ? "bg-blue-700 text-white"
                : isNextKey
                ? "bg-yellow-500 text-white animate-pulse"
                : "bg-gray-300 text-black"
            }`}
          >
            {displayKey}
          </span>
        );
      });
    };

    return (
      <div className="flex flex-col items-center mt-8">
        <div className="flex">{renderKeys(keysRow1)}</div>
        <div className="flex">{renderKeys(keysRow2)}</div>
        <div className="flex">{renderKeys(keysRow3)}</div>
      </div>
    );
  };

  return (
    <div
      className={`max-w-5xl flex flex-col justify-center text-gray-900 transition-all duration-300 ${
        language === "pashto" ? "rtl" : ""
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {showSettings ? (
        <>
          <header className="text-center mb-10 mt-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Typing Test Tool
            </h1>
            <p className="text-lg text-gray-700">
              Push your typing skills to the limit with our advanced test.
              Perfect for improving speed, accuracy, and consistency.
            </p>
          </header>
          <div className="flex items-center justify-center text-gray-900">
            <div className="settings w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Typing Game Settings
              </h2>
              <div className="mb-4">
                <label className="block mb-2 text-lg">Select Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full p-3 rounded bg-gray-200 text-gray-900"
                >
                  <option value="english">English</option>
                  <option value="pashto">Pashto</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-lg">Select Difficulty:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full p-3 rounded bg-gray-200 text-gray-900"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button
                onClick={startGame}
                className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Start Game
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {isCompleted && <Confetti width={width} height={height} />}
          <div
            className="bg-white shadow-lg mt-6 rounded-lg p-4 w-full max-w-6xl overflow-auto transition-all duration-300"
            style={{ direction: language === "pashto" ? "rtl" : "ltr" }}
          >
            <div className="text-2xl flex flex-wrap font-mono leading-relaxed">
              {renderText()}
            </div>
          </div>

          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="mt-4 p-4 text-2xl border-2 border-gray-300 text-black rounded-lg w-full max-w-4xl focus:outline-none transition-all duration-300 font-mono"
            placeholder={
              language === "pashto"
                ? "دلته لیکل پیل کړئ..."
                : "Start typing here..."
            }
            ref={inputRef}
            autoFocus
            disabled={isCompleted}
            style={{ direction: language === "pashto" ? "rtl" : "ltr" }}
          />

          <div className="w-full max-w-4xl h-2 bg-gray-300 rounded mt-2">
            <div
              className="h-full bg-blue-600 rounded"
              style={{ width: `${(wordIndex / words.length) * 100}%` }}
            ></div>
          </div>

          {renderKeyboard()}

          <div className="mt-10 w-full max-w-5xl text-lg">
            <div className="flex justify-between">
              <p>Time: {timer}s</p>
              <p>WPM: {wpm}</p>
              <p>Accuracy: {accuracy.toFixed(2)}%</p>
              <p>Errors: {errors}</p>
            </div>
          </div>

          {isCompleted && (
            <div className="mt-8 text-center">
              <h2 className="text-3xl mt-10 font-bold">{achievement}</h2>
              <button
                onClick={restartTest}
                className="mt-10 p-3 bg-blue-600 text-lg rounded-lg text-white shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Restart Test
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdvanceTypingTest;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { useWindowSize } from "react-use";

const textSamples = {
  easy: {
    english: "Jack fixed the broken TV quickly, surprising everyone.",
    pashto:
      "پلار خپل ماشوم ته يو کتاب ورکړ. دا کتاب ډېر ښه و او ماشوم په خوښۍ سره ولوست.",
  },
  medium: {
    english:
      "Jack quickly fixed the TV, surprising everyone. Zoe asked how he did it. He replied he knew, leaving her speechless.",
    pashto:
      "زما ورور په چټکۍ سره خپل کور پاک کړ. هغه ډېره هڅه وکړه، او کور یې په څو دقیقو کې روښانه او پاک شو.",
  },
  hard: {
    english: `Jack amazed everyone by quickly fixing the broken TV. Zoe, however, couldn’t believe it; she asked, 'How did you manage that?' His simple reply, 'I just knew what to do,' left her speechless.`,
    pashto: `د کتابونو په بازار کې، ډېر خلک راغلي وو. هر کس د خپل خوښې کتاب لټوه، او پلورونکی په مسکا سره خلکو ته هر کتاب وړاندې کاوه.`,
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

    const keysRow1 = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace",
    ];
    const keysRow2 = [
      "Tab",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "[",
      "]",
      "\\",
    ];
    const keysRow3 = [
      "Caps",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ";",
      "'",
      "Enter",
    ];
    const keysRow4 = [
      "Shift",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      ",",
      ".",
      "/",
      "Shift",
    ];
    const spaceKey = ["Space"]; // Representing the space bar

    const renderKeys = (keys: any[], isSpecialRow = false) => {
      return keys.map((key) => {
        const displayKey = isUpperCase ? key.toUpperCase() : key.toLowerCase();
        const isActive = input.slice(-1).toUpperCase() === key.toUpperCase();
        const isNextKey = nextChar.toUpperCase() === key.toUpperCase();
        const isSpecialKey = [
          "Backspace",
          "Tab",
          "Caps Lock",
          "Enter",
          "Shift",
          "Space",
        ].includes(key);

        let keyStyle = "key";
        if (isSpecialKey) {
          keyStyle += " special-key"; // Special styling for larger keys
          if (key === "Space") {
            keyStyle += " space-key"; // Smaller space bar
          }
        }

        return (
          <span
            key={key}
            className={`${keyStyle} ${isNextKey ? "next-key" : "default-key"} ${
              isActive ? "active-key" : ""
            }`}
          >
            {displayKey}
          </span>
        );
      });
    };

    return (
      <div className="keyboard-container">
        <div className="keyboard-row">{renderKeys(keysRow1)}</div>
        <div className="keyboard-row">{renderKeys(keysRow2, true)}</div>
        <div className="keyboard-row">{renderKeys(keysRow3, true)}</div>
        <div className="keyboard-row">{renderKeys(keysRow4, true)}</div>
        <div className="keyboard-row">{renderKeys(spaceKey)}</div>
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
          <header className="text-center mb-7 mt-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Typing Test Tool
            </h1>
            <p className="text-lg text-gray-700">
              Push your typing skills to the limit with our advanced test.
              Perfect for improving speed, accuracy, and consistency.
            </p>
          </header>
          <div className="flex items-center justify-center text-gray-900">
            <div className="settings w-full max-w-lg p-6 bg-white shadow-xl rounded-xl">
              <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                Settings
              </h2>
              <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold text-gray-700">
                  Select Language:
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full p-3 rounded-xl bg-gray-100 text-gray-900 border-2 border-gray-300 focus:border-blue-500 focus:outline-none appearance-none"
                  >
                    <option value="english">English</option>
                    <option value="pashto">Pashto</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-lg font-semibold text-gray-700">
                  Select Difficulty:
                </label>
                <div className="relative">
                  <select
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(e.target.value as Difficulty)
                    }
                    className="w-full p-3 rounded-xl bg-gray-100 text-gray-900 border-2 border-gray-300 focus:border-blue-500 focus:outline-none appearance-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              <button
                onClick={startGame}
                className="w-full p-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
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
            className={`bg-white shadow-lg mt-6 rounded-lg p-2 w-full max-w-6xl overflow-auto transition-all duration-300
            ${language === "pashto" ? "f-b-zar" : ""}`}
            style={{ direction: language === "pashto" ? "rtl" : "ltr" }}
          >
            <div
              className={`text-area text-2xl font-bold font-sans leading-relaxed ${
                language === "pashto" ? "f-b-zar" : ""
              }`}
            >
              {renderText()}
            </div>
          </div>

          <div
            className="w-full max-w-4xl mx-auto"
            style={{ direction: language === "pashto" ? "rtl" : "ltr" }}
          >
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className={`mt-4 p-4 text-2xl border-2 border-gray-300 text-black rounded-lg w-full max-w-4xl focus:outline-none transition-all duration-300 font-mono
                ${language === "pashto" ? "b-zar" : ""}`}
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
          </div>

          {renderKeyboard()}

          <div className="mt-10 w-full max-w-5xl">
            <div className="status-bar grid grid-cols-4 gap-3 p-1 bg-white shadow-lg rounded-lg">
              <div className="status-item">
                <span className="status-icon">⏱</span>
                <p className="status-label">Time:</p>
                <p className="status-value">{timer}s</p>
              </div>
              <div className="status-item">
                <span className="status-icon">⌨️</span>
                <p className="status-label">WPM:</p>
                <p className="status-value">{wpm}</p>
              </div>
              <div className="status-item">
                <span className="status-icon">🎯</span>
                <p className="status-label">Accuracy:</p>
                <p className="status-value">{accuracy.toFixed(2)}%</p>
              </div>
              <div className="status-item">
                <span className="status-icon">❌</span>
                <p className="status-label">Errors:</p>
                <p className="status-value">{errors}</p>
              </div>
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

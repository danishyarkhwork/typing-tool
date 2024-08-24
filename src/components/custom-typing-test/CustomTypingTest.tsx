"use client";

import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import useSound from "use-sound";

const defaultWords = [
  "cat",
  "dog",
  "book",
  "house",
  "car",
  "tree",
  "apple",
  "happy",
  "run",
];

const pashtoWords = [
  "کتاب",
  "کور",
  "موټر",
  "سیب",
  "لوی",
  "خوشحاله",
  "منډه",
  "ټوپ",
  "لوبه",
];

const CustomTypingTest: React.FC = () => {
  const [text, setText] = useState<string[]>(defaultWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [language, setLanguage] = useState("english");
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [customWords, setCustomWords] = useState(text.join(" | "));
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsPerPage = 20;

  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 });

  useEffect(() => {
    const appElement = document.getElementById("__next");
    if (appElement) {
      Modal.setAppElement(appElement);
    }
  }, []);

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

    playTypingSound();

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
  };

  const handleRestart = () => {
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const time = parseInt(e.target.value);
    setSelectedTime(time);
    setTimeLeft(time);
    handleRestart();
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    if (selectedLanguage === "pashto") {
      setText(pashtoWords);
      setCustomWords(pashtoWords.join(" | "));
    } else {
      setText(defaultWords);
      setCustomWords(defaultWords.join(" | "));
    }
    handleRestart();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCustomWordsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCustomWords(e.target.value);
  };

  const handleSaveWords = () => {
    setText(customWords.split(" | "));
    closeModal();
    handleRestart();
  };

  useEffect(() => {
    highlightNextWord("");
  }, [typedWords, currentIndex]);

  // UseEffect to safely access window object
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0">
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            <option value={30}>30 seconds</option>
            <option value={60}>60 seconds</option>
            <option value={120}>120 seconds</option>
          </select>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="english">English</option>
            <option value="pashto">Pashto</option>
          </select>
          <button
            onClick={openModal}
            className="p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Customize Words
          </button>
        </div>
      </div>

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
          <button
            onClick={handleRestart}
            className="p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mt-4"
          >
            Restart Test
          </button>
        </div>
      )}

      {!gameOver && (
        <>
          <div
            id="words"
            className={`text-4xl font-mono whitespace-pre-wrap leading-relaxed tracking-wide ${
              language === "pashto" ? "text-right" : "text-left"
            }`}
            ref={textRef}
          >
            {text.slice(0, currentIndex + wordsPerPage).map((word, index) => {
              const absoluteIndex = index;
              const wordClass =
                typedWords[absoluteIndex] &&
                typedWords[absoluteIndex] === text[absoluteIndex]
                  ? "text-green-500"
                  : typedWords[absoluteIndex]
                  ? "text-red-500"
                  : "";
              return (
                <span
                  key={index}
                  className={`${
                    absoluteIndex === currentIndex
                      ? "bg-gray-200 dark:bg-gray-600 px-1 rounded"
                      : wordClass
                  }`}
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
            className={`w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded text-4xl font-mono bg-gray-100 dark:bg-gray-700 ${
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Customize Words"
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Customize Words
        </h2>
        <textarea
          value={customWords}
          onChange={handleCustomWordsChange}
          className="w-full p-3 h-40 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white resize-none"
        />
        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={closeModal}
            className="p-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveWords}
            className="p-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Save Words
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CustomTypingTest;

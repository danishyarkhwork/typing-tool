"use client";

import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import io from "socket.io-client"; // Import socket.io-client for real-time communication

const socket = io("http://localhost:3000"); // Replace with your server URL

const MultiplayerTypingTest = () => {
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
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState({});
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 });

  useEffect(() => {
    // Initialize words (could be fetched from a server)
    const initialWords = "The quick brown fox jumps over the lazy dog".split(
      " "
    );
    setWords(initialWords);
    setCurrentWord(initialWords[0]);

    // Listen for other players' data
    socket.on("updatePlayers", (players) => {
      setPlayers(players);
    });

    socket.on("playerData", (data) => {
      setPlayerData(data);
    });

    return () => {
      socket.off("updatePlayers");
      socket.off("playerData");
    };
  }, []);

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
      socket.emit("playerFinished", { wpm, accuracy });
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
      socket.emit("updatePlayer", { wpm, wordIndex: wordIndex + 1 });
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

  const renderPlayers = () => {
    return players.map((player) => (
      <div key={player.username} className="flex justify-between mt-2">
        <span>{player.username}</span>
        <span>{playerData[player.username]?.wpm || 0} WPM</span>
        <span>
          {((playerData[player.username]?.wordIndex || 0) / words.length) * 100}
          %
        </span>
      </div>
    ));
  };

  return (
    <div
      className="max-w-5xl flex flex-col justify-center text-gray-900 transition-all duration-300"
      onClick={() => inputRef.current?.focus()}
    >
      {isCompleted && <h2 className="text-center text-3xl">Test Completed!</h2>}
      <div className="bg-white shadow-lg mt-6 rounded-lg p-4 w-full max-w-6xl overflow-auto transition-all duration-300">
        <div className="text-2xl flex flex-wrap font-mono leading-relaxed">
          {renderText()}
        </div>
      </div>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="mt-4 p-4 text-2xl border-2 border-gray-300 text-black rounded-lg w-full max-w-4xl focus:outline-none transition-all duration-300 font-mono"
        placeholder="Start typing here..."
        ref={inputRef}
        autoFocus
        disabled={isCompleted}
      />

      <div className="w-full max-w-4xl h-2 bg-gray-300 rounded mt-2">
        <div
          className="h-full bg-blue-600 rounded"
          style={{ width: `${(wordIndex / words.length) * 100}%` }}
        ></div>
      </div>

      <div className="mt-10 w-full max-w-5xl text-lg">
        <div className="flex justify-between">
          <p>Time: {timer}s</p>
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy.toFixed(2)}%</p>
          <p>Errors: {errors}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl mb-4">Other Players</h3>
        {renderPlayers()}
      </div>
    </div>
  );
};

export default MultiplayerTypingTest;

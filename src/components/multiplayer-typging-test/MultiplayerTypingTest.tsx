"use client";

import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import Pusher from "pusher-js";

const pusher = new Pusher("7e12b00a7da7645b9f48", {
  cluster: "ap2",
});

interface PlayerData {
  wpm: number;
  wordIndex: number;
  progress: number;
}

interface Players {
  [key: string]: PlayerData;
}

const MultiplayerTypingTest: React.FC = () => {
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem("username") || ""
  );
  const [isJoined, setIsJoined] = useState<boolean>(!!username);
  const [input, setInput] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [players, setPlayers] = useState<Players>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playTypingSound] = useSound("/assets/keypress.wav", { volume: 0.5 });

  useEffect(() => {
    if (isJoined) {
      const initialWords = "The quick brown fox jumps over the lazy dog".split(
        " "
      );
      setWords(initialWords);
      setCurrentWord(initialWords[0]);

      const channel = pusher.subscribe("typing-test");

      channel.bind("updatePlayers", (data: { players: Players }) => {
        setPlayers(data.players);
      });

      channel.bind(
        "playerJoined",
        (data: { username: string; players: Players }) => {
          setPlayers(data.players);
          console.log(`${data.username} has joined the game!`);
        }
      );

      return () => {
        pusher.unsubscribe("typing-test");
      };
    }
  }, [isJoined]);

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
      fetch("/api/playerFinished", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, wpm, accuracy }),
      }).then(() => {
        // Congratulatory effect
        const confetti = document.createElement("div");
        confetti.innerText = "🎉 Congratulations! 🎉";
        confetti.className =
          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl";
        document.body.appendChild(confetti);
        setTimeout(() => {
          document.body.removeChild(confetti);
        }, 3000);
      });
    } else {
      calculateWpm();
    }
  }, [isCompleted, correctWords.length]);

  const handleJoin = () => {
    if (username.trim() !== "") {
      setIsJoined(true);
      localStorage.setItem("username", username);
      fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }).then(() => {
        setPlayers((prevPlayers) => ({
          ...prevPlayers,
          [username]: { wpm: 0, wordIndex: 0, progress: 0 },
        }));
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    playTypingSound();
    setInput(value);

    if (!isTyping) {
      setIsTyping(true);
    }

    if (value.trim() === currentWord) {
      const newWordIndex = wordIndex + 1;
      setCorrectWords([...correctWords, currentWord]);
      setInput("");
      setWordIndex(newWordIndex);
      setCurrentWord(words[newWordIndex]);

      const newProgress = (newWordIndex / words.length) * 100;
      const newWpm = Math.round((correctWords.length + 1) / (timer / 60));

      fetch("/api/updatePlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          wpm: newWpm,
          wordIndex: newWordIndex,
          progress: newProgress,
        }),
      });

      setPlayers((prevPlayers) => ({
        ...prevPlayers,
        [username]: {
          wpm: newWpm,
          wordIndex: newWordIndex,
          progress: newProgress,
        },
      }));

      if (newWordIndex === words.length) {
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
    return Object.keys(players).map((username) => (
      <div
        key={username}
        className="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded-md"
      >
        <span className="text-lg font-semibold text-gray-700">{username}</span>
        <span className="text-lg font-medium text-gray-600">
          {players[username]?.wpm || 0} WPM
        </span>
        <span className="text-sm text-gray-500">
          {players[username]?.progress?.toFixed(2) || 0}%
        </span>
      </div>
    ));
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-gray-900 py-8">
      {!isJoined ? (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Join the Game
          </h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleJoin}
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
          >
            Join Game
          </button>
        </div>
      ) : (
        <>
          {isCompleted && (
            <h2 className="text-center text-3xl font-bold text-green-600 mb-6">
              Test Completed!
            </h2>
          )}
          <div className="bg-white shadow-lg mt-6 rounded-lg p-6 w-full max-w-6xl overflow-auto">
            <div className="text-2xl flex flex-wrap font-mono leading-relaxed">
              {renderText()}
            </div>
          </div>

          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="mt-4 p-4 text-2xl border-2 border-gray-300 text-black rounded-lg w-full max-w-4xl focus:outline-none font-mono"
            placeholder="Start typing here..."
            ref={inputRef}
            autoFocus
            disabled={isCompleted}
          />

          <div className="w-full max-w-4xl h-2 bg-gray-300 rounded mt-4">
            <div
              className="h-full bg-blue-600 rounded"
              style={{ width: `${(wordIndex / words.length) * 100}%` }}
            ></div>
          </div>

          <div className="mt-10 w-full max-w-5xl text-lg">
            <div className="flex justify-between text-gray-700">
              <p>Time: {timer}s</p>
              <p>WPM: {wpm}</p>
              <p>Accuracy: {accuracy.toFixed(2)}%</p>
              <p>Errors: {errors}</p>
            </div>
          </div>

          <div className="mt-10 w-full max-w-5xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">
              Other Players
            </h3>
            {renderPlayers()}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiplayerTypingTest;

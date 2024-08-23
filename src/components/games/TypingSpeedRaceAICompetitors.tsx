"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { nanoid } from "nanoid";
import useSound from "use-sound";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const sentenceLists = {
  english: {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "I love to code every day.",
      "The sun is shining brightly.",
      "Type fast to win the race.",
      "React is a great library.",
    ],
    medium: [
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
  },
  pashto: {
    easy: [
      "تاسو څومره چټک ټایپ کولی شئ؟",
      "دې ټکي ته پام وکړئ.",
      "زه هره ورځ کوډ کول خوښوم.",
      "لوی سپی چمتو دی.",
      "کتاب په میز کې پروت دی.",
    ],
    medium: [
      "سور فاکس د سست سپي څخه پورته ټوپ وهلی.",
      "لوی سپی چمتو دی.",
      "زه هره ورځ کوډ کول خوښوم.",
      "لوی سپی چمتو دی.",
      "کتاب په میز کې پروت دی.",
    ],
    hard: [
      "تاسو څومره چټک ټایپ کولی شئ؟",
      "لوی سپی چمتو دی.",
      "زه هره ورځ کوډ کول خوښوم.",
      "کتاب په میز کې پروت دی.",
      "سور فاکس د سست سپي څخه پورته ټوپ وهلی.",
    ],
  },
};

const AICompetitors = [
  { name: "Speedy Bot", speed: 250 }, // Characters per minute
  { name: "Pro Typist", speed: 200 },
  { name: "Casual Typer", speed: 150 },
];

const TypingRaceGame: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [currentSentence, setCurrentSentence] = useState<{
    id: string;
    sentence: string;
  } | null>(null);
  const [playerProgress, setPlayerProgress] = useState<number>(0);
  const [aiProgress, setAiProgress] = useState<Record<string, number>>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [language, setLanguage] = useState<string>("english");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  const startTimeRef = useRef<number | null>(null);
  const aiIntervalRefs = useRef<Record<string, NodeJS.Timeout | null>>({});

  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 }); // Add typing sound

  const { width, height } = useWindowSize(); // For confetti size

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now();
      resetAIProgress();
      startAICompetitors();
    }
  }, [isPlaying]);

  const resetAIProgress = () => {
    const initialProgress: Record<string, number> = {};
    AICompetitors.forEach((ai) => {
      initialProgress[ai.name] = 0;
    });
    setAiProgress(initialProgress);
  };

  const startAICompetitors = () => {
    AICompetitors.forEach((ai) => {
      const interval = setInterval(() => {
        setAiProgress((prevProgress) => {
          const newProgress = { ...prevProgress };
          newProgress[ai.name] =
            (newProgress[ai.name] || 0) +
            ai.speed / (sentenceLists[language][difficulty][0].length * 2);
          if (newProgress[ai.name] >= 100) {
            clearInterval(interval);
            newProgress[ai.name] = 100;
          }
          return newProgress;
        });
      }, 1000);
      aiIntervalRefs.current[ai.name] = interval;
    });
  };

  useEffect(() => {
    const checkGameOver = () => {
      if (playerProgress >= 100) {
        setWinner("You");
        setGameOver(true);
        stopAICompetitors();
      } else {
        AICompetitors.forEach((ai) => {
          if ((aiProgress[ai.name] || 0) >= 100) {
            setWinner(ai.name);
            setGameOver(true);
            stopAICompetitors();
          }
        });
      }
    };
    if (isPlaying && !gameOver) {
      checkGameOver();
    }
  }, [playerProgress, aiProgress, isPlaying, gameOver]);

  const stopAICompetitors = () => {
    AICompetitors.forEach((ai) => {
      if (aiIntervalRefs.current[ai.name]) {
        clearInterval(aiIntervalRefs.current[ai.name]!);
      }
    });
  };

  const calculateWPM = () => {
    if (!startTimeRef.current) return 0;
    const timeSpentMinutes = (Date.now() - startTimeRef.current) / 60000;
    const wordsTyped = currentSentence
      ? currentSentence.sentence.split(" ").length
      : 0;
    return wordsTyped / timeSpentMinutes;
  };

  const generateNewSentence = () => {
    const sentenceList = sentenceLists[language][difficulty];
    const newSentence =
      sentenceList[Math.floor(Math.random() * sentenceList.length)];
    return { id: nanoid(), sentence: newSentence };
  };

  const handleStart = () => {
    setIsPlaying(true);
    setGameOver(false);
    setPlayerProgress(0);
    setAiProgress({});
    setCurrentSentence(generateNewSentence());
    setInput("");
    setWinner(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Play the typing sound on every key press
    playTypingSound();

    if (currentSentence) {
      const correctText = currentSentence.sentence.substring(0, value.length);
      if (value === correctText) {
        const progress = (value.length / currentSentence.sentence.length) * 100;
        setPlayerProgress(progress);

        if (value === currentSentence.sentence) {
          setPlayerProgress(100);
        }
      } else {
        setPlayerProgress((prevProgress) => Math.max(prevProgress - 1, 0));
      }
    }
  };

  return (
    <div
      className={`game-container max-w-4xl mx-auto p-8 rounded-lg shadow-lg space-y-8 ${
        language === "pashto" ? "text-right" : "text-left"
      } ${
        language === "pashto" ? "rtl" : ""
      } bg-white text-gray-900 transition-all duration-300`}
    >
      {!isPlaying && !gameOver && (
        <>
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Test Your Typing Speed Against AI Competitors
            </h1>
            <p className="text-lg text-gray-700">
              Take the challenge and race against AI to improve your typing
              speed and accuracy.
            </p>
          </header>
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-6">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-900"
              >
                <option value="english">English</option>
                <option value="pashto">Pashto</option>
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="p-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-900"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button
              onClick={handleStart}
              className="mt-6 p-4 bg-blue-600 rounded-lg text-white shadow-lg hover:bg-blue-700 transition duration
-300"
            >
              Start Race
            </button>
          </div>
        </>
      )}{" "}
      {gameOver && (
        <div className="text-center">
          <Confetti width={width} height={height} />
          <h2 className="text-4xl font-bold mb-4">
            {winner === "You" ? "Congratulations! You won!" : `${winner} wins!`}
          </h2>
          <p className="text-lg">Your WPM: {calculateWPM().toFixed(2)}</p>
          <button
            onClick={handleStart}
            className="mt-6 p-4 bg-blue-600 rounded-lg text-white shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Play Again
          </button>
        </div>
      )}
      {isPlaying && !gameOver && currentSentence && (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-lg">
            <div>Player Progress: {playerProgress.toFixed(2)}%</div>
            <div>
              Timer:{" "}
              {((Date.now() - (startTimeRef.current || 0)) / 1000).toFixed(1)}s
            </div>
          </div>
          <div
            className={`text-2xl p-4 rounded-lg shadow-md leading-relaxed ${
              language === "pashto" ? "text-right" : "text-left"
            } bg-gray-100`}
            dir={language === "pashto" ? "rtl" : "ltr"}
          >
            {currentSentence.sentence.split("").map((char, idx) => (
              <span
                key={idx}
                className={`${
                  input[idx] === char
                    ? "text-green-600"
                    : input[idx]
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {char}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className={`w-full p-4 bg-white border-2 border-gray-300 rounded-lg text-xl text-black focus:outline-none focus:border-blue-500 ${
              language === "pashto" ? "text-right" : "text-left"
            }`}
            placeholder={
              language === "pashto"
                ? "دلته ټایپ کول پیل کړئ..."
                : "Start typing..."
            }
            dir={language === "pashto" ? "rtl" : "ltr"}
            autoFocus
            disabled={gameOver}
          />

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">AI Competitors:</h3>
            {AICompetitors.map((ai) => (
              <div key={ai.name} className="mb-4">
                <div className="flex justify-between">
                  <span>{ai.name}</span>
                  <span>{(aiProgress[ai.name] || 0).toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-lg h-2">
                  <div
                    className="bg-red-500 h-2 rounded-lg"
                    style={{ width: `${aiProgress[ai.name] || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Your Progress:</h3>
            <div className="w-full bg-gray-300 rounded-lg h-2">
              <div
                className="bg-blue-500 h-2 rounded-lg"
                style={{ width: `${playerProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TypingRaceGame);

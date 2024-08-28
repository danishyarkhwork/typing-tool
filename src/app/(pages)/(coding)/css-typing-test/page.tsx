"use client";

import React, { useState, useEffect, useRef } from "react";
import ProgressBarCSS from "@/components/coding/css/ProgressBar";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";
import InstructionsCSS from "@/components/coding/css/Instructions";
import PerformanceMetricsCSS from "@/components/coding/css/PerformanceMetrics";
import { cssSteps } from "@/data/cssContent";
import useSound from "use-sound";

const CSSTypingPractice: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [typedCode, setTypedCode] = useState<string>("");
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load typing sound
  const [playTypingSound] = useSound("assets/keypress.wav", { volume: 0.5 });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && currentStepIndex < cssSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setTypedCode("");
      setProgress(0);
    }
  }, [progress]);

  const currentStep = cssSteps[currentStepIndex];

  const handleCodeChange = (value: string) => {
    // Play typing sound on input change
    playTypingSound();

    setTypedCode(value);
    calculateProgress(value);
    calculateWpm(value);
    calculateAccuracy(value);
    updateIframeContent(value);
  };

  const calculateProgress = (newCode: string) => {
    const trimmedExample = currentStep.code.trim();
    const trimmedTypedCode = newCode.trim();
    const progress = Math.min(
      (trimmedTypedCode.length / trimmedExample.length) * 100,
      100
    );
    setProgress(progress);
  };

  const calculateWpm = (newCode: string) => {
    const words = newCode.split(/\s+/).filter((word) => word.length > 0).length;
    const minutes = timeElapsed / 60;
    setWpm(Math.round(words / minutes));
  };

  const calculateAccuracy = (newCode: string) => {
    const correctCharacters = currentStep.code
      .split("")
      .filter((char: string, index: number) => newCode[index] === char).length;

    const totalTyped = newCode.length;
    const accuracy = totalTyped ? (correctCharacters / totalTyped) * 100 : 100;
    setAccuracy(accuracy);
  };

  const toggleFullscreen = () => {
    if (codeEditorRef.current) {
      if (!document.fullscreenElement) {
        codeEditorRef.current.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  return (
    <section
      ref={codeEditorRef}
      className="bg-gradient-to-b from-blue-100 via-slate-200 to-white text-gray-900 min-h-screen flex flex-col items-center pt-20 pb-12"
    >
      <div className="max-w-6xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            CSS3 Typing Practice
          </h2>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium shadow-md hover:bg-primary-dark transition-colors"
            onClick={toggleFullscreen}
          >
            Toggle Fullscreen
          </button>
        </div>

        <InstructionsCSS
          currentStep={currentStepIndex + 1}
          totalSteps={cssSteps.length}
          instruction={currentStep.instruction}
          exampleCode={currentStep.code}
        />

        <div className="bg-white rounded-lg p-3 shadow-md">
          <CodeMirror
            value={typedCode}
            extensions={[css()]}
            onChange={(value) => handleCodeChange(value)}
            height="250px"
            theme={EditorView.theme({
              "&": {
                color: "#333",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "10px",
              },
              ".cm-content": {
                caretColor: "#2c3e50",
                fontFamily: "'Fira Code', monospace",
                fontSize: "22px",
              },
              ".cm-line": {
                padding: "0 4px",
                "&:before": {
                  color: "#2980b9",
                },
              },
              "&.cm-focused .cm-cursor": {
                borderLeftColor: "#27ae60",
              },
              ".cm-matchingBracket, .cm-nonmatchingBracket": {
                backgroundColor: "#ecf0f1",
              },
            })}
          />
        </div>

        <ProgressBarCSS progress={progress} />
        <PerformanceMetricsCSS
          wpm={wpm}
          accuracy={accuracy}
          timeElapsed={timeElapsed}
        />
        {currentStepIndex >= cssSteps.length && (
          <div className="congratulations">
            Congratulations! You've completed all steps!
          </div>
        )}
      </div>
    </section>
  );
};

export default CSSTypingPractice;
function updateIframeContent(value: string) {
  throw new Error("Function not implemented.");
}

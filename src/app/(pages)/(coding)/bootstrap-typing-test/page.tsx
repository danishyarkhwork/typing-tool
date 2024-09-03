"use client";

import React, { useState, useEffect, useRef } from "react";
import ProgressBarBootstrap from "@/components/coding/bootstrap/ProgressBar";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import InstructionsBootstrap from "@/components/coding/bootstrap/Instructions";
import PerformanceMetricsBootstrap from "@/components/coding/bootstrap/PerformanceMetrics";
import { bootstrapSteps } from "@/data/bootstrapContent";
import useSound from "use-sound";

const BootstrapTypingPractice: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [typedCode, setTypedCode] = useState<string>("");
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null); // Reference to the iframe element
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
    if (progress === 100 && currentStepIndex < bootstrapSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setTypedCode("");
      setProgress(0);
    }
  }, [progress]);

  const currentStep = bootstrapSteps[currentStepIndex];

  const handleCodeChange = (value: string) => {
    // Play typing sound on input change
    playTypingSound();

    setTypedCode(value);
    calculateProgress(value);
    calculateWpm(value);
    calculateAccuracy(value);
    updateIframeContent(value); // Update the iframe content with the new Bootstrap HTML code
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

  const updateIframeContent = (htmlCode: string) => {
    if (iframeRef.current) {
      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(`
          <html>
            <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            </head>
            <body>
              ${htmlCode}
            </body>
          </html>
        `);
        iframeDocument.close();
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
            Bootstrap Typing Practice
          </h2>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium shadow-md hover:bg-primary-dark transition-colors"
            onClick={toggleFullscreen}
          >
            Toggle Fullscreen
          </button>
        </div>

        <InstructionsBootstrap
          currentStep={currentStepIndex + 1}
          totalSteps={bootstrapSteps.length}
          instruction={currentStep.instruction}
          exampleCode={currentStep.code}
        />

        <div className="bg-white rounded-lg p-3 shadow-md">
          <CodeMirror
            value={typedCode}
            extensions={[html()]}
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

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Live Preview
          </h2>
          <iframe
            ref={iframeRef}
            className="w-full p-3 h-40 border border-gray-300 rounded-md shadow-sm"
            title="Live Preview"
          ></iframe>
        </div>

        <ProgressBarBootstrap progress={progress} />
        <PerformanceMetricsBootstrap
          wpm={wpm}
          accuracy={accuracy}
          timeElapsed={timeElapsed}
        />
        {currentStepIndex >= bootstrapSteps.length && (
          <div className="congratulations">
            Congratulations! You've completed all steps!
          </div>
        )}
      </div>
    </section>
  );
};

export default BootstrapTypingPractice;

"use client";

import React, { useState, useEffect, useRef } from "react";
import ProgressBarTailwind from "@/components/coding/tailwind/ProgressBar";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";
import InstructionsTailwind from "@/components/coding/tailwind/Instructions";
import PerformanceMetricsTailwind from "@/components/coding/tailwind/PerformanceMetrics";
import { tailwindSteps } from "@/data/tailwindContent";
import useSound from "use-sound";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";

const TailwindTypingPractice: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [typedCode, setTypedCode] = useState<string>("");
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
    if (progress === 100 && currentStepIndex < tailwindSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setTypedCode("");
      setProgress(0);
    }
  }, [progress]);

  const currentStep = tailwindSteps[currentStepIndex];

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

  const updateIframeContent = (code: string) => {
    if (iframeRef.current) {
      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document;

      if (iframeDocument) {
        // Including Tailwind CSS via CDN in the iframe content
        const tailwindCDN = `
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        `;

        iframeDocument.open();
        iframeDocument.write(`
          <html>
            <head>
              ${tailwindCDN}
            </head>
            <body>
              <div class="p-4">${code}</div>
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
            Tailwind CSS Typing Practice
          </h2>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium shadow-md hover:bg-primary-dark transition-colors"
            onClick={toggleFullscreen}
          >
            Toggle Fullscreen
          </button>
        </div>

        <InstructionsTailwind
          currentStep={currentStepIndex + 1}
          totalSteps={tailwindSteps.length}
          instruction={currentStep.instruction}
          exampleCode={currentStep.code}
        />

        <div className="bg-white rounded-lg p-3 shadow-md">
          <CodeMirror
            value={typedCode}
            extensions={[
              html({ autoCloseTags: true }), // Enable auto close tags in HTML
              css(),
              autocompletion(),
              closeBrackets(), // Enable auto closing of brackets
            ]}
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

        <ProgressBarTailwind progress={progress} />
        <PerformanceMetricsTailwind
          wpm={wpm}
          accuracy={accuracy}
          timeElapsed={timeElapsed}
        />
        {currentStepIndex >= tailwindSteps.length && (
          <div className="congratulations">
            Congratulations! You've completed all steps!
          </div>
        )}
      </div>
    </section>
  );
};

export default TailwindTypingPractice;

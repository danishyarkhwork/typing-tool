import { Metadata } from "next";
import AdvanceTypingTest from "@/components/advance-typing-test/AdvanceTypingTest";

export const metadata: Metadata = {
  title: "Free Typing Test Tool - Advanced Mode",
  description:
    "Enhance your typing skills with our Advanced Typing Test Tool. Challenge yourself and track your progress.",
  // additional metadata
};

const TypingSpeedAI = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-100 via-slate-200 to-white text-gray-900 min-h-screen flex flex-col items-center pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto">
            <AdvanceTypingTest />
          </div>
        </div>
      </section>
    </>
  );
};

export default TypingSpeedAI;

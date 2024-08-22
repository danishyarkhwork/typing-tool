import { Metadata } from "next";
import AdvanceTypingTest from "@/components/advance-typing-test/AdvanceTypingTest";

export const metadata: Metadata = {
  title: "Free Typing Test Tool",
  description: "This is Free Typing Test Page",
  // other metadata
};

const TypingSpeedAI = () => {
  return (
    <>
      <section className="bg-gradient-to-b bg-gray-800 via-slate-200 to-slate-50 text-black min-h-screen relative pt-18">
        <AdvanceTypingTest />
      </section>
    </>
  );
};

export default TypingSpeedAI;

import { Metadata } from "next";
import TypingConqueror from "@/components/games/TypingConqueror";

export const metadata: Metadata = {
  title: "Free Typing Test Tool",
  description: "This is Free Typing Test Page",
  // other metadata
};

const TypingSpeedAI = () => {
  return (
    <>
      <section className="bg-gradient-to-b bg-gray-800 via-slate-200 to-slate-50 text-black min-h-screen relative pt-18">
        <TypingConqueror />
      </section>
    </>
  );
};

export default TypingSpeedAI;

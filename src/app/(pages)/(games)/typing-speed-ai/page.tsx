import { Metadata } from "next";
import TypingSpeedRaceAICompetitors from "@/components/games/TypingSpeedRaceAICompetitors";

export const metadata: Metadata = {
  title: "Free Typing Test Tool",
  description:
    "Improve your typing skills with our Free Typing Test Tool. Race against AI competitors and boost your typing speed.",
  // additional metadata
};

const TypingSpeedAI = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-100 via-slate-200 to-white text-black min-h-screen flex flex-col items-center pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-5xl mx-auto">
            <TypingSpeedRaceAICompetitors />
          </div>
        </div>
      </section>
    </>
  );
};

export default TypingSpeedAI;

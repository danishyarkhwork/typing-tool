import { Metadata } from "next";
import WordFallGame from "@/components/games/WordFallGame";

export const metadata: Metadata = {
  title: "Free Typing Test Tool",
  description: "This is Free Typing Test Page",
  // other metadata
};

const WordFallGamePage = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-500 via-slate-200 to-slate-50 text-black min-h-screen relative pt-18 pb-12">
        <WordFallGame />
      </section>
    </>
  );
};

export default WordFallGamePage;

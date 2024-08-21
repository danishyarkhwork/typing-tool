import { Metadata } from "next";
import TypeRacerGame from "@/components/games/TypeRacerGame";

export const metadata: Metadata = {
  title: "Free Typing Test Tool",
  description: "This is Free Typing Test Page",
  // other metadata
};

const WordFallGamePage = () => {
  return (
    <>
      <section className="bg-gradient-to-b bg-gray-800 via-slate-200 to-slate-50 text-black min-h-screen relative pt-24 pb-12">
        <TypeRacerGame />
      </section>
    </>
  );
};

export default WordFallGamePage;

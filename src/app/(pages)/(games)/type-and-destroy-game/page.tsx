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
      <section className="bg-gradient-to-b from-blue-100 via-slate-200 to-white text-gray-900 min-h-screen flex flex-col items-center pt-20 pb-12">
        <TypeRacerGame />
      </section>
    </>
  );
};

export default WordFallGamePage;

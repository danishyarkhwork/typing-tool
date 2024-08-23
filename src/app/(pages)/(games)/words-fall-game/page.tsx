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
      <section className="">
        <WordFallGame />
      </section>
    </>
  );
};

export default WordFallGamePage;

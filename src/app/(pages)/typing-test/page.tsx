import TypingTest from "@/components/typing-test/TypingTest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Typing Test Tool",
  description: "This is Free Typing Test Page",
  // other metadata
};

const TypingTestPage = () => {
  return (
    <>
      <section className="bg-slate-100 text-black min-h-screen relative pt-24 pb-12">
        <TypingTest />
      </section>
    </>
  );
};

export default TypingTestPage;

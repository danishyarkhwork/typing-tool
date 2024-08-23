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
      <section className="bg-gradient-to-b from-blue-100 via-slate-200 to-white text-gray-900 min-h-screen flex flex-col items-center pt-20 pb-12">
        <TypingTest />
      </section>
    </>
  );
};

export default TypingTestPage;

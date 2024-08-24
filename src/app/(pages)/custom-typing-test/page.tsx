import CustomTypingTest from "@/components/custom-typing-test/CustomTypingTest";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Typing Test | Asan Typing",
  description: "This is Free Typing Test Page",
  // other metadata
};

const CustomTypingTestPage = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-100 via-slate-200 to-white text-gray-900 min-h-screen flex flex-col items-center pt-20 pb-12">
        <CustomTypingTest />
      </section>
    </>
  );
};

export default CustomTypingTestPage;

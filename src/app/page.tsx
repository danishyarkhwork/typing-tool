"use client";
import Image from "next/image";
import Link from "next/link";
import { useTypingEffect } from "../hooks/useTypingEffect"; // Adjust the path according to your directory structure

export default function Home() {
  const { displayedText, isTyping } = useTypingEffect(
    "Learn to Type Faster",
    100,
    30000
  );

  return (
    <>
      <section className="relative mt-20" id="hero">
        {/* Background Image */}
        <Image
          className="absolute w-full h-[490px] hidden md:block"
          src="assets/images/hero/school-bg.svg"
          alt="Background"
          fill
          priority
        />
        {/* Gradient Background */}
        <div className="absolute z-[-100] w-full h-[125%] transform -translate-y-40 bg-gradient-to-br from-blue-300 to-blue-500 -skew-y-8"></div>

        {/* Main Content */}
        <div className="px-6 relative z-10">
          <div className="max-w-6xl mx-auto min-h-[23rem] flex items-center pt-16 md:pt-28 pb-14 lg:pb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12 md:gap-3 lg:gap-12 items-center">
              {/* Text Section */}
              <div className="md:col-span-6 xl:col-span-5 text-white flex flex-col items-center md:items-start">
                <div className="relative w-full flex flex-col items-center md:items-start">
                  <div className="relative md:mb-6 lg:mb-6 w-full flex flex-col items-center">
                    <h1
                      className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl"
                      aria-label="Learn to Type Faster"
                      style={{ minHeight: "3rem", color: "transparent" }} // Placeholder text color
                    >
                      Learn to Type Faster
                    </h1>
                    <h1
                      className={`absolute top-0 left-1/2 transform -translate-x-1/2 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl transition-colors duration-500 ${
                        isTyping ? "text-gray-900" : "text-gray-700"
                      }`}
                      style={{ minHeight: "3rem", textAlign: "center" }} // Typing text color, centered
                    >
                      {displayedText}
                      <span
                        className={`${
                          isTyping
                            ? "border-r-2 border-gray-900"
                            : "border-none"
                        } ml-1 animate-blink`}
                      >
                        {" "}
                      </span>
                    </h1>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-lg tracking-wide text-gray-900 w-full flex flex-col items-center md:items-start">
                  <li className="flex items-start">
                    <Image
                      className="w-4 mr-2 pt-1"
                      src="assets/images/hero/blue-bullet.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <p className="text-base">
                      Aligned to Federal and State Standards
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Image
                      className="w-4 mr-2 pt-1"
                      src="assets/images/hero/blue-bullet.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <p className="text-base">
                      Prepares Students for Standardized Testing
                    </p>
                  </li>
                  <li className="flex items-start">
                    <Image
                      className="w-4 mr-2 pt-1"
                      src="assets/images/hero/blue-bullet.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <p className="text-base">
                      Powerful District and Classroom Management
                    </p>
                  </li>
                </ul>
              </div>

              {/* Image Section */}
              <div className="md:col-span-6 xl:col-span-7">
                <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 mt-8 lg:mt-0">
                  <div className="relative h-full">
                    <Image
                      className="z-10 hidden md:block absolute scale-[0.9] h-full w-full -left-5 -bottom-10 md:-left-8 md:-bottom-14 lg:bottom-0 xl:-bottom-16"
                      src="assets/images/hero/shape-blue-blob-1.svg"
                      alt=""
                      fill
                    />
                    <div className="relative z-20 h-full w-full flex flex-col">
                      <div className="grow flex w-full h-44 md:h-54 relative justify-center">
                        <Image
                          className="absolute bottom-0"
                          src="assets/images/hero/learner-2.svg"
                          alt="Learner"
                          height={200}
                          width={300}
                        />
                      </div>
                      <div className="h-full max-h-[8rem] lg:max-h-[10rem] xl:max-h-[8rem] flex flex-col gap-3 p-6 bg-white shadow-xl rounded-xl text-sm">
                        <h2 className="text-lg font-bold text-gray-800">
                          Learn to Type for Free
                        </h2>
                        <p className="grow h-full text-gray-600 mb-3 text-lg">
                          Join millions of Typing.com users and learn to type at
                          your own pace with gamified lessons and student-led
                          progression.
                        </p>
                        <div className="absolute -bottom-3 right-3">
                          <Link
                            className="text-sm px-3 hover:bg-yellow-500 py-2 bg-yellow-400 text-gray-600 rounded-lg shadow-xl btn btn-a"
                            href="/advance-typing-test"
                            role="button"
                          >
                            Start Typing Today »
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative sm:mt-10 mt-20 md:mt-10 lg:mt-0 h-full">
                    <Image
                      className="z-10 hidden md:block absolute scale-[0.9] w-full h-[19rem] left-0 top-[4rem] -rotate-12"
                      src="assets/images/hero/shape-blue-blob-2.svg"
                      alt=""
                      fill
                    />
                    <div className="relative z-20 h-full w-full flex flex-col">
                      <div className="grow flex w-full h-44 md:h-54 relative justify-center">
                        <Image
                          className="absolute bottom-0"
                          src="assets/images/hero/educator-2.svg"
                          alt="Educator"
                          height={200}
                          width={300}
                        />
                      </div>
                      <div className="h-full max-h-[11rem] lg:max-h-[15rem] xl:max-h-[11rem] flex flex-col gap-3 p-6 bg-white shadow-xl rounded-xl text-sm">
                        <h2 className="text-lg font-bold text-gray-800">
                          For Instructors and Admins
                        </h2>
                        <p className="grow h-full text-gray-600 mb-3 text-lg">
                          Manage class and student-level settings and meet
                          student needs with timed tests, custom lessons, auto
                          reporting, and more.
                        </p>
                        <div className="absolute -bottom-3 right-3">
                          <Link
                            className="text-sm hover:bg-yellow-500 px-3 py-2 bg-yellow-400 rounded-lg shadow-xl btn btn-a"
                            href="#"
                            role="button"
                          >
                            Sign Up Now »
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="px-4 py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-blue-100"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-800 mb-12 leading-tight">
            Go Beyond Typing with <br className="hidden lg:block" />
            Digital Citizenship, Coding, and Career Prep
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {[
              {
                src: "assets/images/features/feature1.svg",
                alt: "Comprehensive Keyboarding",
                text: "Comprehensive Keyboarding",
              },
              {
                src: "assets/images/features/feature2.svg",
                alt: "Computer Basics & Tech Literacy",
                text: "Computer Basics & Tech Literacy",
              },
              {
                src: "assets/images/features/feature3.svg",
                alt: "Online Behavior & Safety",
                text: "Online Behavior & Safety",
              },
              {
                src: "assets/images/features/feature4.svg",
                alt: "Coding Fundamentals",
                text: "Coding Fundamentals",
              },
              {
                src: "assets/images/features/feature5.svg",
                alt: "Career Prep & Professionalism",
                text: "Career Prep & Professionalism",
              },
              {
                src: "assets/images/features/feature6.svg",
                alt: "English, Spanish, & Portuguese",
                text: "English, Spanish, & Portuguese",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center flex flex-col items-center"
              >
                <div className="flex items-center justify-center w-24 h-24 bg-blue-200 rounded-full shadow-md transform hover:scale-110 transition-transform duration-300">
                  <img
                    className="w-12 h-12"
                    src={feature.src}
                    alt={feature.alt}
                  />
                </div>
                <p className="mt-4 text-base font-medium text-blue-800">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 pt-20 bg-blue-50">
        <div className="max-w-6xl mx-auto relative rounded-xl bg-blue-100 border border-blue-200 shadow-lg flex items-center flex-col md:flex-row">
          <div className="relative z-20 flex-shrink-0 -mt-10 md:mt-0 md:-mt-12  lg:-mt-12">
            <img
              className="w-40 sm:w-38 md:w-46 md:ml-20 lg:ml-20 lg:w-54 transform -scale-x-100"
              src="assets/images/teacher-presenting-2.svg"
              alt="Teacher presenting"
            />
          </div>
          <div className="flex flex-col p-8 md:pl-16 md:text-left w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
              Teachers and Administrators, Get Started Today
            </h2>
            <p className="my-4 text-blue-700">
              Grade, track, and report on students' progress in real time.
              Unlimited students, unlimited classes, unlimited teachers,
              unlimited schools. Typing.com's teacher portal is FREE!
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:justify-start">
              <a
                href="/teacher/signup"
                className="px-6 py-2 text-white bg-yellow-400 hover:bg-yellow-500 rounded shadow-md transition-all duration-300 text-center"
                data-action="teacher signup"
                data-label="illustrated callout"
              >
                Sign Up Now »
              </a>
              <a
                href="/teachers"
                className="px-6 py-2 text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded shadow-md transition-all duration-300 text-center"
                data-action="teacher page"
                data-label="illustrated callout"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

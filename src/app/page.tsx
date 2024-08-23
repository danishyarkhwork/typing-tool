import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <div className="max-w-screen-xl mx-auto min-h-[23rem] flex items-center pt-16 md:pt-28 pb-14 lg:pb-32">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12 md:gap-3 lg:gap-12 items-center">
              {/* Text Section */}
              <div className="md:col-span-6 xl:col-span-5 text-white text-center md:text-left">
                <div className="legacy">
                  <h1
                    className="typing flex flex-wrap justify-center md:justify-start font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl"
                    aria-label="Learn to Type Faster"
                  >
                    <div className="mb-2 flex typing-word">
                      {"Learn-to-Type-Faster"
                        .split(" ")
                        .map((word, wordIndex) => (
                          <div
                            key={wordIndex}
                            className="flex mb-2 typing-word"
                          >
                            {word.split("").map((letter, letterIndex) => (
                              <div
                                key={letterIndex}
                                className="relative flex text-blue-700 text-opacity-50 typing-letter"
                                active="false"
                                typed="true"
                              >
                                {letter}
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                  </h1>
                </div>
                <ul className="mt-4 space-y-2 text-lg tracking-wide text-gray-900">
                  <li className="flex items-start justify-center md:justify-start">
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
                  <li className="flex items-start justify-center md:justify-start">
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
                  <li className="flex items-start justify-center md:justify-start">
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
                        <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                          Learn to Type for Free
                        </h2>
                        <p className="grow h-full text-gray-600 mb-3 text-lg">
                          Join millions of Typing.com users and learn to type at
                          your own pace with gamified lessons and student-led
                          progression.
                        </p>
                        <div className="absolute -bottom-3 right-3">
                          <Link
                            className="text-sm px-3 py-2 bg-yellow-300 text-gray-600 rounded-lg shadow-xl btn btn-a"
                            href="/advance-typing-test"
                            role="button"
                          >
                            Start Typing Today »
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-full">
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
                        <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                          For Instructors and Admins
                        </h2>
                        <p className="grow h-full text-gray-600 mb-3 text-lg">
                          Manage class and student-level settings and meet
                          student needs with timed tests, custom lessons, auto
                          reporting, and more.
                        </p>
                        <div className="absolute -bottom-3 right-3">
                          <Link
                            className="text-sm px-3 py-2 bg-yellow-300 rounded-lg shadow-xl btn btn-a"
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

              <div className="hidden md:block w-full lg:w-6/12 px-2 origin-top-left transform scale-125 -translate-y-16">
                <Image
                  src="/dist/site_typing/images/hero/hero-image-combined.png"
                  alt="Typing.com"
                  width={500}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

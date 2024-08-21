import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-white from-slate-500/10 relative text-black">
      <section className="relative pt-44 pb-36">
        <div className="container">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-center sm:text-start">
                <h1 className="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-semibold mb-7">
                  Test & Improve your{" "}
                  <span className="relative z-0 after:bg-green-500/50 after:-z-10 after:absolute md:after:h-6 after:h-4 after:w-full after:bottom-0 after:end-0">
                    Typing Speed{" "}
                  </span>
                  with our free Typing Games
                </h1>
                <p className="sm:text-lg text-gray-500">
                  If you want a quick way to test your typing speed, try out our
                  1-minute free Typing test (available in over 10 languages).
                  You can quickly see how fast you can type and compare your
                  result with your friends.
                </p>
                <div className="flex gap-3 mt-8">
                  <Link
                    href="/typing-test"
                    className="py-3 px-6 rounded border border-primary text-white bg-primary hover:shadow-lg hover:shadow-primary/50 focus:outline focus:outline-primary/50 transition-all duration-500"
                  >
                    <i className="fa-solid fa-bag-shopping me-2"></i> START
                    TYPING TEST
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="stroke-green-500 stroke-2 w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm text-gray-700">Free 14-day Demo</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="stroke-green-500 stroke-2 w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm text-gray-700">
                      No credit card needed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="hidden sm:block">
                  <div className="before:w-24 before:h-24 before:absolute before:-bottom-8 before:-start-8 before:bg-[url('/images/pattern/dot2.svg')]"></div>
                  <div className="after:w-24 after:h-24 after:absolute after:-top-10 after:end-10 2xl:after:end-0 after:rotate-45 after:bg-[url('/images/pattern/dot5.svg')]"></div>
                </div>

                <div
                  id="swiper_one"
                  className="swiper border-[6px] border-white bg-white 2xl:w-[140%]"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                >
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a
                          href="#"
                          className="sm:h-14 h-10 sm:w-14 w-10 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <svg
                            className="h-5 w-5 fill-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M16.1628 6.83709C19.3876 9.02928 21 10.1254 21 12.0001C21 13.8748 19.3876 14.9709 16.1628 17.1631C15.2726 17.7682 14.3897 18.338 13.5783 18.8128C12.8665 19.2293 12.0604 19.6602 11.2258 20.0831C8.00859 21.7134 6.39999 22.5286 4.95724 21.6261C3.5145 20.7236 3.38338 18.8342 3.12114 15.0555C3.04698 13.9868 3 12.9392 3 12.0001C3 11.0609 3.04698 10.0133 3.12114 8.9447C3.38338 5.16597 3.5145 3.2766 4.95725 2.37408C6.39999 1.47155 8.00859 2.28672 11.2258 3.91706C12.0604 4.34 12.8665 4.77085 13.5783 5.18738C14.3897 5.66216 15.2726 6.23193 16.1628 6.83709Z" />
                          </svg>
                        </a>
                      </div>
                      <img
                        src="assets/images/hero/saas1.png"
                        alt="saas1"
                        className="w-full h-full rounded-md"
                      />
                    </div>

                    <div className="swiper-slide">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a
                          href="#"
                          className="sm:h-14 h-10 sm:w-14 w-10 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <svg
                            className="h-5 w-5 fill-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M16.1628 6.83709C19.3876 9.02928 21 10.1254 21 12.0001C21 13.8748 19.3876 14.9709 16.1628 17.1631C15.2726 17.7682 14.3897 18.338 13.5783 18.8128C12.8665 19.2293 12.0604 19.6602 11.2258 20.0831C8.00859 21.7134 6.39999 22.5286 4.95724 21.6261C3.5145 20.7236 3.38338 18.8342 3.12114 15.0555C3.04698 13.9868 3 12.9392 3 12.0001C3 11.0609 3.04698 10.0133 3.12114 8.9447C3.38338 5.16597 3.5145 3.2766 4.95725 2.37408C6.39999 1.47155 8.00859 2.28672 11.2258 3.91706C12.0604 4.34 12.8665 4.77085 13.5783 5.18738C14.3897 5.66216 15.2726 6.23193 16.1628 6.83709Z" />
                          </svg>
                        </a>
                      </div>
                      <img
                        src="assets/images/hero/saas2.png"
                        alt="saas2"
                        className="w-full h-full rounded-md"
                      />
                    </div>

                    <div className="swiper-slide">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a
                          href="#"
                          className="sm:h-14 h-10 sm:w-14 w-10 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <svg
                            className="h-5 w-5 fill-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M16.1628 6.83709C19.3876 9.02928 21 10.1254 21 12.0001C21 13.8748 19.3876 14.9709 16.1628 17.1631C15.2726 17.7682 14.3897 18.338 13.5783 18.8128C12.8665 19.2293 12.0604 19.6602 11.2258 20.0831C8.00859 21.7134 6.39999 22.5286 4.95724 21.6261C3.5145 20.7236 3.38338 18.8342 3.12114 15.0555C3.04698 13.9868 3 12.9392 3 12.0001C3 11.0609 3.04698 10.0133 3.12114 8.9447C3.38338 5.16597 3.5145 3.2766 4.95725 2.37408C6.39999 1.47155 8.00859 2.28672 11.2258 3.91706C12.0604 4.34 12.8665 4.77085 13.5783 5.18738C14.3897 5.66216 15.2726 6.23193 16.1628 6.83709Z" />
                          </svg>
                        </a>
                      </div>
                      <img
                        src="assets/images/hero/saas3.png"
                        alt="saas3"
                        className="w-full h-full rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="absolute bottom-0 inset-x-0 hidden sm:block">
        <img
          src="assets/images/shapes/white-wave.svg"
          alt="white-wave-svg"
          className="w-full -scale-x-100 -scale-y-100"
        />
      </div>
    </section>
  );
}

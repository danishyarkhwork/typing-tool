"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        id="navbar"
        className="light fixed top-0 inset-x-0 flex items-center z-40 w-full bg-white transition-all py-5"
      >
        <div className="container">
          <nav className="flex items-center">
            <Link href="/">
              <img
                src="assets/images/logo-dark.png"
                className="h-8 logo-dark"
                alt="Logo Dark"
              />
              <img
                src="assets/images/logo-light.png"
                className="h-8 logo-light"
                alt="Logo Light"
              />
            </Link>

            <div className="hidden lg:block ms-auto">
              <ul className="navbar-nav flex gap-x-3 items-center justify-center">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    href="javascript:void(0);"
                    className="nav-link after:absolute hover:after:-bottom-10 after:inset-0 fc-dropdown"
                    data-fc-trigger="hover"
                    data-fc-target="innerPageDropdownMenu"
                    data-fc-type="dropdown"
                    data-fc-placement="bottom"
                  >
                    Typing{" "}
                    <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                  </a>

                  <div
                    id="innerPageDropdownMenu"
                    style={{ left: "901.922px", top: "58px" }}
                    className="opacity-0 mt-4 fc-dropdown-open:opacity-100 fc-dropdown-open:translate-y-0 translate-y-3 origin-center transition-all bg-white rounded-lg shadow-lg border p-2 w-48 space-y-1.5 fc-dropdown absolute hidden"
                  >
                    <div className="nav-item">
                      <Link className="nav-link" href="/typing-test">
                        Typing Test
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="contact.html">
                        Advanced Test
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="contact.html">
                        Custom Typing Test
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <a
                    href="javascript:void(0);"
                    className="nav-link after:absolute hover:after:-bottom-10 after:inset-0 fc-dropdown"
                    data-fc-trigger="hover"
                    data-fc-target="innerPageDropdownMenu2"
                    data-fc-type="dropdown"
                    data-fc-placement="bottom"
                  >
                    Games{" "}
                    <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                  </a>

                  <div
                    id="innerPageDropdownMenu2"
                    style={{ left: "901.922px", top: "58px" }}
                    className="opacity-0 mt-4 fc-dropdown-open:opacity-100 fc-dropdown-open:translate-y-0 translate-y-3 origin-center transition-all bg-white rounded-lg shadow-lg border p-2 w-48 space-y-1.5 fc-dropdown absolute hidden"
                  >
                    <div className="nav-item">
                      <Link className="nav-link" href="/words-fall-game">
                        Words Fall Game
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="/type-and-destroy-game">
                        Type & Destroy
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="/typing-speed-ai">
                        Typing Speed AI
                      </Link>
                    </div>

                    <div className="nav-item">
                      <Link className="nav-link" href="/typing-conqueror">
                        Typing Conqueror
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="contact.html">
                    Typing Competition
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="contact.html">
                    Text Practice
                  </Link>
                </li>
              </ul>
            </div>

            <div className="hidden lg:flex items-center ms-3">
              <Link
                href="https://1.envato.market/prompt-tailwind"
                target="_blank"
                className="bg-primary text-white px-4 py-2 rounded inline-flex items-center text-sm"
              >
                Login
              </Link>
            </div>

            <div className="lg:hidden flex items-center ms-auto px-2.5">
              <button
                type="button"
                data-fc-target="mobileMenu"
                data-fc-type="offcanvas"
              >
                <i className="fa-solid fa-bars text-2xl text-gray-500"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        id="mobileMenu"
        className="fc-offcanvas-open:translate-x-0 translate-x-full fixed top-0 end-0 transition-all duration-200 transform h-full w-full max-w-md z-50 bg-white border-s hidden"
      >
        <div className="flex flex-col h-full divide-y-2 divide-gray-200">
          <div className="p-6 flex items-center justify-between">
            <Link href="index.html">
              <img
                src="assets/images/logo-dark.png"
                className="h-8"
                alt="Logo"
              />
            </Link>

            <button data-fc-dismiss className="flex items-center px-2">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="p-6 overflow-scroll h-full">
            <ul
              className="navbar-nav flex flex-col gap-2"
              data-fc-type="accordion"
            >
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="javascript:void(0)"
                  data-fc-type="collapse"
                  className="nav-link"
                >
                  Landing
                  <i className="fa-solid fa-angle-down ms-auto align-middle transition-all fc-collapse-open:rotate-180"></i>
                </Link>

                <ul className="hidden overflow-hidden transition-[height] duration-300 space-y-2">
                  <li className="nav-item mt-2">
                    <Link className="nav-link" href="home-app.html">
                      App
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-saas.html">
                      Saas Modern
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-saas2.html">
                      Saas Classic
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-startup.html">
                      Startup
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-software.html">
                      Software
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-agency.html">
                      Agency
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-coworking.html">
                      Coworking
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-crypto.html">
                      Crypto
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-marketing.html">
                      Marketing
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="home-portfolio.html">
                      Portfolio
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  href="javascript:void(0)"
                  data-fc-type="collapse"
                  className="nav-link"
                >
                  Pages
                  <i className="fa-solid fa-angle-down ms-auto align-middle transition-all fc-collapse-open:rotate-180"></i>
                </Link>

                <ul className="hidden overflow-hidden transition-[height] duration-300 space-y-2">
                  <li className="nav-item mt-2">
                    <Link className="nav-link" href="company.html">
                      Company
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="career.html">
                      Career
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="pricing.html">
                      Pricing
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="help.html">
                      Help
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  href="javascript:void(0)"
                  data-fc-type="collapse"
                  className="nav-link"
                >
                  Blog Page
                  <i className="fa-solid fa-angle-down ms-auto align-middle transition-all fc-collapse-open:rotate-180"></i>
                </Link>

                <ul className="hidden overflow-hidden transition-[height] duration-300 space-y-2">
                  <li className="nav-item mt-2">
                    <Link className="nav-link" href="blog.html">
                      Blog
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="blog-post.html">
                      Blog Post
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  href="javascript:void(0)"
                  data-fc-type="collapse"
                  className="nav-link"
                >
                  Portfolio
                  <i className="fa-solid fa-angle-down ms-auto align-middle transition-all fc-collapse-open:rotate-180"></i>
                </Link>

                <ul className="hidden overflow-hidden transition-[height] duration-300 space-y-2">
                  <li className="nav-item mt-2">
                    <Link className="nav-link" href="portfolio-grid.html">
                      Portfolio Grid
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="portfolio-masonry.html">
                      Portfolio Masonry
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="portfolio-item.html">
                      Portfolio Item
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="account-confirm.html">
                      Confirm Account
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  href="javascript:void(0)"
                  data-fc-type="collapse"
                  className="nav-link"
                >
                  Account
                  <i className="fa-solid fa-angle-down ms-auto align-middle transition-all fc-collapse-open:rotate-180"></i>
                </Link>

                <ul className="hidden overflow-hidden transition-[height] duration-300 space-y-2">
                  <li className="nav-item mt-2">
                    <Link className="nav-link" href="account-login.html">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="account-signup.html">
                      Sign Up
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="account-forget-password.html"
                    >
                      Forget Password
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" href="account-confirm.html">
                      Confirm Account
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="contact.html">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-6 flex items-center justify-center">
            <Link
              href="https://1.envato.market/prompt-tailwind"
              target="_blank"
              className="bg-primary w-full text-white p-3 rounded flex items-center justify-center text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Modal from "react-modal";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaTimes,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    agreeToPrivacy: false,
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (menu: string) => {
    setActiveMobileDropdown(activeMobileDropdown === menu ? null : menu);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
    setSignupForm({
      name: "",
      email: "",
      password: "",
      agreeToPrivacy: false,
    });
    setFormErrors({});
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginForm({
      email: "",
      password: "",
    });
    setFormErrors({});
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const validateSignupForm = () => {
    let errors: { [key: string]: string } = {};

    if (!signupForm.name) errors.name = "Name is required";
    if (!signupForm.email) errors.email = "Email is required";
    if (!signupForm.password) errors.password = "Password is required";
    if (!signupForm.agreeToPrivacy)
      errors.agreeToPrivacy = "You must agree to the privacy policy";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSignupForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          signupForm.email,
          signupForm.password
        );
        const user = userCredential.user;
        console.log("User signed up successfully:", user);
        closeSignupModal();
      } catch (error: any) {
        console.error("Signup error:", error.message);
        setFormErrors({ server: error.message });
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
      const user = userCredential.user;
      console.log("User logged in successfully:", user);
      closeLoginModal();
    } catch (error: any) {
      console.error("Login error:", error.message);
      setFormErrors({ server: error.message });
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 inset-x-0 flex items-center z-40 w-full transition-all py-5 ${
          isScrolled
            ? "bg-white bg-opacity-70 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img
              src="assets/images/logo-dark.png"
              className="h-10 logo-dark"
              alt="Logo Dark"
            />
            <img
              src="assets/images/logo-light.png"
              className="h-10 logo-light"
              alt="Logo Light"
            />
          </Link>

          <div className="hidden lg:block">
            <ul className="navbar-nav flex gap-x-6 items-center justify-center">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter("typing")}
                onMouseLeave={handleMouseLeave}
              >
                <a className="nav-link cursor-pointer">
                  Typing{" "}
                  <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                </a>
                {activeDropdown === "typing" && (
                  <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-48">
                    <div className="nav-item">
                      <Link className="nav-link" href="/typing-test">
                        Typing Test
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/advance-typing-test">
                        Advanced Test
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/custom-typing-test">
                        Custom Typing Test
                      </Link>
                    </div>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        href="/multiplayer-typing-test"
                      >
                        Multiplayer Typing
                      </Link>
                    </li>
                  </div>
                )}
              </li>
              <li
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter("games")}
                onMouseLeave={handleMouseLeave}
              >
                <a className="nav-link cursor-pointer">
                  Games{" "}
                  <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                </a>
                {activeDropdown === "games" && (
                  <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-48">
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
                  </div>
                )}
              </li>
              <li
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter("coding")}
                onMouseLeave={handleMouseLeave}
              >
                <a className="nav-link cursor-pointer">
                  Coding{" "}
                  <i className="fa-solid fa-angle-down ms-2 align-middle"></i>
                </a>
                {activeDropdown === "coding" && (
                  <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-48">
                    <div className="nav-item">
                      <Link className="nav-link" href="/html-typing-test">
                        HTML
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/css-typing-test">
                        CSS
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/bootstrap-typing-test">
                        Bootstrap
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/tailwind-typing-test">
                        Tailwind
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link className="nav-link" href="/javascript-typing-test">
                        JavaScript
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          {session ? (
            <p>Welcome, {session.user?.name}</p>
          ) : (
            <p>Please sign in</p>
          )}

          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <>
                <div className="relative">
                  <a
                    href="javascript:void(0);"
                    className="nav-link flex items-center"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "profile" ? null : "profile"
                      )
                    }
                  >
                    <div className="shrink">
                      <div className="h-8 w-8 me-2">
                        {session?.user ? (
                          <img
                            src={
                              session.user.image ||
                              "assets/images/avators/default-avatar.jpg"
                            }
                            className="avatar h-full w-full rounded-full me-2"
                            alt="User Avatar"
                          />
                        ) : (
                          <img
                            src="assets/images/avators/default-avatar.jpg"
                            className="avatar h-full w-full rounded-full me-2"
                            alt="Default Avatar"
                          />
                        )}
                      </div>
                    </div>
                    {session?.user ? (
                      <div className="hidden lg:block grow ms-1 leading-normal">
                        <span className="block text-sm font-medium">
                          {session.user.name}
                        </span>
                        <span className="block text-gray-400 text-xs">
                          User
                        </span>
                      </div>
                    ) : (
                      <div className="hidden lg:block grow ms-1 leading-normal">
                        <span className="block text-sm font-medium">Guest</span>
                        <span className="block text-gray-400 text-xs">
                          User
                        </span>
                      </div>
                    )}
                  </a>

                  {activeDropdown === "profile" && (
                    <div
                      id="innerPageDropdownMenu"
                      className="absolute right-0 mt-4 bg-white rounded-lg shadow-lg border p-2 w-56 z-50"
                    >
                      <div className="nav-item rounded hover:bg-gray-100 transition-all">
                        <a className="nav-link flex items-center p-2" href="#">
                          <svg
                            className="h-5 w-5 text-gray-500 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          Profile
                        </a>
                      </div>

                      <hr className="border-gray-200 my-2" />

                      <div className="nav-item rounded hover:bg-gray-100 transition-all">
                        <a
                          className="nav-link flex items-center p-2"
                          href="#"
                          onClick={() => signOut()}
                        >
                          <svg
                            className="h-5 w-5 text-gray-500 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                          </svg>
                          Sign Out
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center text-sm font-medium shadow-md hover:bg-primary-dark transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModal}
                  className="text-primary px-4 py-2 rounded-lg border border-primary inline-flex items-center text-sm font-medium shadow-md hover:bg-primary hover:text-white transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-2xl text-gray-500"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="fixed top-0 inset-x-0 z-50 h-screen bg-white p-6 flex flex-col space-y-4 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <Link href="/" className="flex items-center">
              <img
                src="assets/images/logo-dark.png"
                className="h-8"
                alt="Logo"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl text-gray-500"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="flex flex-col space-y-4">
            <li className="nav-item">
              <Link href="/" className="nav-link text-lg font-medium">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-lg font-medium flex justify-between items-center w-full"
                onClick={() => toggleMobileDropdown("typing")}
              >
                Typing
                <FaChevronDown
                  className={`${
                    activeMobileDropdown === "typing" ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {activeMobileDropdown === "typing" && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link className="nav-link" href="/typing-test">
                      Typing Test
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/advance-typing-test">
                      Advanced Test
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-lg font-medium"
                      href="/multiplayer-typing-test"
                    >
                      Multiplayer Typing
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-lg font-medium flex justify-between items-center w-full"
                onClick={() => toggleMobileDropdown("games")}
              >
                Games
                <FaChevronDown
                  className={`${
                    activeMobileDropdown === "games" ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {activeMobileDropdown === "games" && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link className="nav-link" href="/words-fall-game">
                      Words Fall Game
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/type-and-destroy-game">
                      Type & Destroy
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/typing-speed-ai">
                      Typing Speed AI
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-lg font-medium flex justify-between items-center w-full"
                onClick={() => toggleMobileDropdown("coding")}
              >
                Coding
                <FaChevronDown
                  className={`${
                    activeMobileDropdown === "coding" ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {activeMobileDropdown === "coding" && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link className="nav-link" href="/html-typing-test">
                      HTML
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" href="/css-typing-test">
                      CSS
                    </Link>
                  </li>
                  <div className="nav-item">
                    <Link className="nav-link" href="/bootstrap-typing-test">
                      Bootstrap
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link className="nav-link" href="/tailwind-typing-test">
                      Tailwind
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link className="nav-link" href="/javascript-typing-test">
                      JavaScript
                    </Link>
                  </div>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/blog">
                Blog
              </Link>
            </li>

            <div className="flex space-x-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow-md hover:bg-red-600 transition-colors flex-1"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={openLoginModal}
                    className="bg-primary text-white px-4 py-3 rounded-lg text-center font-medium shadow-md hover:bg-primary-dark transition-colors flex-1"
                  >
                    Login
                  </button>
                  <button
                    onClick={openSignupModal}
                    className="text-primary px-4 py-3 rounded-lg text-center border border-primary font-medium shadow-md hover:transition-colors flex-1"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      )}

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupModalOpen}
        onRequestClose={closeSignupModal}
        contentLabel="Sign Up"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          {formErrors.server && (
            <div className="text-red-500 mb-4">{formErrors.server}</div>
          )}
          <div className="mb-4">
            <FaUser className="inline mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signupForm.name}
              onChange={handleSignupChange}
              className="w-full p-3 border rounded"
            />
            {formErrors.name && (
              <div className="text-red-500">{formErrors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <FaEnvelope className="inline mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={handleSignupChange}
              className="w-full p-3 border rounded"
            />
            {formErrors.email && (
              <div className="text-red-500">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <FaLock className="inline mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={handleSignupChange}
              className="w-full p-3 border rounded"
            />
            {formErrors.password && (
              <div className="text-red-500">{formErrors.password}</div>
            )}
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="agreeToPrivacy"
              checked={signupForm.agreeToPrivacy}
              onChange={handleSignupChange}
              className="mr-2"
            />
            <label>I agree to the Privacy Policy</label>
            {formErrors.agreeToPrivacy && (
              <div className="text-red-500">{formErrors.agreeToPrivacy}</div>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeSignupModal}
              className="p-3 bg-red-500 text-white rounded-lg shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg shadow-md"
            >
              Sign Up
            </button>
          </div>
        </form>
      </Modal>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          {formErrors.server && (
            <div className="text-red-500 mb-4">{formErrors.server}</div>
          )}
          <div className="mb-4">
            <FaEnvelope className="inline mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="w-full p-3 border rounded"
            />
            {formErrors.email && (
              <div className="text-red-500">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <FaLock className="inline mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="w-full p-3 border rounded"
            />
            {formErrors.password && (
              <div className="text-red-500">{formErrors.password}</div>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeLoginModal}
              className="p-3 bg-red-500 text-white rounded-lg shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white rounded-lg shadow-md"
            >
              Login
            </button>
          </div>
        </form>
      </Modal>

      <style jsx global>{`
        .Modal {
          position: absolute;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          margin-right: -50%;
          transform: translate(-50%, -50%);
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }

        .Overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 9999;
        }
      `}</style>
    </>
  );
};

export default Header;

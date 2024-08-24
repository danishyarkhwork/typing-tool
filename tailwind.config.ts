const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        spin: "spin 2s linear infinite",
        bounce: "bounce 1.5s infinite",
        pulse: "pulse 1.5s infinite",
      },
      colors: {
        teal: {
          300: "#4FD1C5",
          700: "#2C7A7B",
        },
      },
    },
  },
  plugins: [],
};

export default config;

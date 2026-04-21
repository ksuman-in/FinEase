/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "loading-bar": {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "loading-slide": {
          "0%": { transform: "translateX(-150%)" },
          "50%": { transform: "translateX(100%)", width: "40%" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        "loading-bar": "loading-bar 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;

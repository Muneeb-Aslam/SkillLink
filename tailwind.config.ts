import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#04ADE6",
        "dark-blue": "#25324B",
        "light-gray": "#7C8493",
        "lightest-gray": "#D6DDEB",
        danger: "#D93F21",
        heading: "#1E1E1E",
        normal: "#5E6368",
        blackish: "#25324B",
        grayish: "#7C8493",
        secondary: "#D6DDEB",
        background: "#FFF",
        "primary-background": "#F8F8FD",
        "secondary-background": "#202430",
        "getting-start": "#4640DE",
        gray: {
          100: "rgba(248, 248, 253, 1)",
          primary: "rgba(0,0,0,1)",
          secondary: "rgba(114, 114, 114, 1)",
          border: "rgba(228, 228, 228, 1)",
        },
        neutral: {
          80: "rgba(81, 91, 111, 1)",
          20: "rgba(214, 221, 235, 1)",
          100: "rgba(37, 50, 75, 1)",
        },
        main: {
          500: "rgba(4, 173, 230, 1)",
          100: "rgba(4, 173, 230, 0.1)",
        },
        "border-gray": "rgba(228, 228, 228, 1)",
      },
    },
    borderColor: {
      input: "#C9C9C9",
      primary: "#A8ADB7",
      "landing-border": "#D6DDEB",
      white:"#FFF",
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Epilogue: ["Epilogue", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;

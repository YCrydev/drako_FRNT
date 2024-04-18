import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      // min-width
      sm: "500px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1420px",

      xxxl: "1460px",

      "xxxl-max": { max: "1460px" },
      "lg-max": { max: "1024px" },
      "md-max": { max: "768px" },
    },
    extend: {
      colors: {
        green: {
          100: "#24B278",
          200: "#0E583F",
        },
        gray: {
          10: "rgba(255, 255, 255, 0.16)",
          25: "rgba(217, 217, 217, 0.20)",
          50: "rgba(217, 217, 217, 1.0)",
          200: "#EDEDE8",
          500: "#E9EAE5",
          100: "#808182",
          600: "#54514B",
        },
        white: {
          0: "#FFFFFF",
          100: "#F3F5F7",
        },
        black: {
          100: "#131313",
          600: "#1F2120",
          800: "#030303",
          900: "#0D0D0D",
        },
        orange: {
          100: "#ff8d40",
          50: "rgba(255, 141, 64, 0.1)",
        },
        yellow: {
          100: "#ffd500",
        },
        lg: {
          100: "linear-gradient(180deg, #FFD47A 0%, #FFB210 100%)",
        },
      },
      fontFamily: {
        Lato700: ["Lato700"],
        Lato400: ["Lato400"],
      },
      backgroundImage: {
        wheel: "url('/wheel/Wheel.svg')",
      },
    },
  },
  plugins: [],
};
export default config;

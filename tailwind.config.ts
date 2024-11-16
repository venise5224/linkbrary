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
        background: "#ffffff",
        white200: "#f5f5f5",
        black100: "#000",
        black200: "#111322",
        black300: "#373740",
        black400: "#c4c4c4",
        black500: "#1f1f1f",
        red100: "#ff5b56",
        gray100: "#f0f6ff",
        gray200: "#e7effb",
        gray300: "#ccd5e3",
        gray400: "#9fa6b2",
        gray500: "#3e3e43",
        gray600: "#6b6b6b",
        gray700: "#676767",
        gray800: "#CFCFCF",
        gray900: "#f7f7f7",
        purple50: "#7D7AFF",
        purple100: "#6d6afe",
      },
      screens: {
        sm: { min: "343px", max: "767px" },
        md: { min: "768px", max: "1199px" },
        lg: { min: "1200px" },
      },
    },
  },
  plugins: [],
};
export default config;

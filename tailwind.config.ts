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
        background: "var(--background)",
        black100: "var(--black100)",
        black200: "var(--black200)",
        black300: "var(--black300)",
        red100: "var(--red100)",
        gray100: "var(--gray100)",
        gray200: "var(--gray200)",
        gray300: "var(--gray300)",
        gray400: "var(--gray400)",
        gray500: "var(--gray500)",
        purple100: "var(--purple100)",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;

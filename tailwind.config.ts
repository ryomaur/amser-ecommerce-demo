import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["var(--inter)", "var(--noto-sans)", "sans-serif"],
      mono: ["var(--share-tech-mono)", "var(--noto-sans)", "monospace"],
    },
    extend: {
      boxShadow: {
        card: "11px 11px 22px 0 #BCBCBB, -11px -11px 22px 0 #FFFFFF",
        cardSmall: "5px 5px 10px 0 #BCBCBB, -5px -5px 10px 0 #FFFFFF",
      },
      colors: {
        background: "#E8E8E7", // Background color
        foreground: "#404040", // Foreground color
        dark: "#111111", // Primary - Dark
        red: "#E03941", // Primary - Red
        light: "#EAEAEA", // Primary - Light
        lightblue: "#3390A6", // Primary - Blue
        blue: "#4040ff", // Primary - Blue
        altlight: "#AFAFAF", // Alternative Light
        altdark: "#393939", // Alternative Light
        bglight: "#F6F6F6", // Background - Light
        bglighter: "#FEFCF8", // Background - Lighter
        fglight: "#555555", // Foreground - Light
        fglighter: "#696969", // Foreground - Lighter
        bgtransparent: "rgba(232, 232, 231, 0.38)", // Transparent Background
        bgtransparentalt: "rgba(254, 252, 248, 0.38)", // Transparent Background
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;

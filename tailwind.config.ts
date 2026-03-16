/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{svelte,ts}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#C9732E",
          soft: "#E8A96A",
        },

        surface: {
          light: "#F7F7F8",
          dark: "#0E0E0F",
        },

        card: {
          light: "rgba(255,255,255,0.7)",
          dark: "rgba(26,26,28,0.7)",
        },

        border: {
          light: "rgba(0,0,0,0.08)",
          dark: "rgba(255,255,255,0.08)",
        },

        text: {
          primary: "#1C1C1E",
          secondary: "#6E6E73",
        },
      },

      borderRadius: {
        card: "18px",
        control: "12px",
      },

      backdropBlur: {
        glass: "20px",
      },

      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.06)",
        cardHover: "0 10px 24px rgba(0,0,0,0.1)",
      },

      transitionTimingFunction: {
        apple: "cubic-bezier(.22,.61,.36,1)",
      },

      transitionDuration: {
        fast: "120ms",
        normal: "200ms",
        slow: "320ms",
      },
    },
  },
  plugins: [],
};
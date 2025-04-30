/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mulish: ["Mulish", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        slideUp: "slideUp 0.4s ease-out",

      },
    },
  },
  plugins: [],
};

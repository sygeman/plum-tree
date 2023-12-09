/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwindcss-bg-patterns")],
  theme: {
    // defaults to these values
    patterns: {
      opacities: {
        5: ".05",
        10: ".10",
        20: ".20",
        40: ".40",
        60: ".60",
        80: ".80",
        100: "1",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        paper: "#F7F8FA",
        teal: {
          DEFAULT: "#0F8B8D",
          50: "#EAF7F7",
          100: "#D2EEEE",
          400: "#1BA6A8",
          500: "#0F8B8D",
          600: "#0B6C6E",
          700: "#084F50",
        },
        amber: {
          DEFAULT: "#F2A93B",
          50: "#FEF6E9",
          100: "#FDEBCD",
          400: "#F4B959",
          500: "#F2A93B",
          600: "#D88E1F",
        },
        slate: {
          DEFAULT: "#5B6472",
          50: "#F7F8FA",
          100: "#EEF0F3",
          200: "#E4E7EC",
          400: "#8A94A3",
          500: "#5B6472",
          700: "#3A4250",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "trace-grid":
          "linear-gradient(to right, rgba(15,139,141,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,139,141,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        trace: "36px 36px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        dash: "dash 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        dash: {
          to: { strokeDashoffset: -24 },
        },
      },
    },
  },
  plugins: [],
};

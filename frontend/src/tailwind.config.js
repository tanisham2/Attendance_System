/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        chain: {
          bg: "#0a0e1a",
          surface: "#111827",
          card: "#1a2235",
          border: "#1e2d45",
          accent: "#00e5ff",
          green: "#00ffa3",
          purple: "#7c3aed",
          amber: "#f59e0b",
          red: "#ef4444",
          text: "#e2e8f0",
          muted: "#64748b",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(0,229,255,0.15)",
        "glow-green": "0 0 20px rgba(0,255,163,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
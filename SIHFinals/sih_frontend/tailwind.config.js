/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: "var(--primary)",
      "primary-foreground": "var(--primary-foreground)",
      secondary: "var(--secondary)",
      "secondary-foreground": "var(--secondary-foreground)",
      accent: "var(--accent)",
      "accent-foreground": "var(--accent-foreground)",
      border: "var(--border)",
    }
    },
  },
  plugins: [],
}


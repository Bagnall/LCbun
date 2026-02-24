/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
	extend: {
	  fontFamily: {
		sans: ["var(--font-sans)"],
		serif: ["var(--font-serif)"],
	  },
	  colors: {
		bg: "rgb(var(--bg) / <alpha-value>)",
		surface1: "rgb(var(--surface-1) / <alpha-value>)",
		surface2: "rgb(var(--surface-2) / <alpha-value>)",
		surface3: "rgb(var(--surface-3) / <alpha-value>)",
		text: "rgb(var(--text) / <alpha-value>)",
		muted: "rgb(var(--text-muted) / <alpha-value>)",
		border: "rgb(var(--border) / <alpha-value>)",
		borderStrong: "rgb(var(--border-strong) / <alpha-value>)",
		primary: "rgb(var(--primary) / <alpha-value>)",
		secondary: "rgb(var(--secondary) / <alpha-value>)",
		link: "rgb(var(--link) / <alpha-value>)",
	  },
	  borderRadius: {
		xs: "var(--r-xs)",
		sm: "var(--r-sm)",
		md: "var(--r-md)",
		lg: "var(--r-lg)",
		xl: "var(--r-xl)",
	  },
	  boxShadow: {
		sm: "var(--sh-sm)",
		md: "var(--sh-md)",
		lg: "var(--sh-lg)",
		card: "var(--card-shadow)",
	  },
	  maxWidth: {
		measure: "var(--measure)",
		"container-sm": "var(--container-sm)",
		"container-md": "var(--container-md)",
		"container-lg": "var(--container-lg)",
		"container-xl": "var(--container-xl)",
	  },
	},
  },
  plugins: [],
};

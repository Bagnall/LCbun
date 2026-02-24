import * as React from "react";

export const ThemeContext = React.createContext({
	theme: "light",
	isDark: false,
	toggle: () => {},
});

export class ThemeProvider extends React.Component {
	constructor(props) {
		super(props);

		const saved = localStorage.getItem("theme");
		let theme = "light";
		if (saved === "dark" || saved === "light") {
			theme = saved;
		} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			theme = "dark";
		}

		this.state = { theme };

		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {
		this.applyTheme(this.state.theme);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.theme !== this.state.theme) {
			this.applyTheme(this.state.theme);
		}
	}

	applyTheme(theme) {
		const root = document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("theme", theme);
	}

	toggle() {
		this.setState((s) => ({ theme: s.theme === "dark" ? "light" : "dark" }));
	}

	render() {
		const value = {
			theme: this.state.theme,
			isDark: this.state.theme === "dark",
			toggle: this.toggle,
		};

		return (
			<ThemeContext.Provider value={value}>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

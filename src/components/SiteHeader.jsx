import * as React from "react";
import { Link } from "react-router-dom";
import Switch from "./ui/switch.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default class SiteHeader extends React.Component {
	static contextType = ThemeContext;

	render() {
		const { isDark, toggle } = this.context;

		return (
			<header className="border-b border-border bg-surface1">
				<div className="container-page flex items-center justify-between py-3 gap-4">
					<Link to="/" className="leading-tight shrink-0">
						<div className="text-sm text-muted">University of Cambridge</div>
						<div className="font-semibold tracking-[var(--ls-heading)]">Language Centre</div>
					</Link>

					<div className="flex items-center gap-2 shrink-0">
						<span className="text-sm text-muted hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
						<Switch checked={isDark} onCheckedChange={toggle} aria-label="Toggle theme" />
					</div>
				</div>
			</header>
		);
	}
}

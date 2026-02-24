import * as React from "react";
import { Link } from "react-router-dom";
import Switch from "./ui/switch.jsx";
import Button from "./ui/button.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default class SiteHeader extends React.Component {
	static contextType = ThemeContext;

	render() {
		const { showBack = false } = this.props;
		const { isDark, toggle } = this.context;

		return (
			<header className="border-b border-border bg-surface1">
				<div className="container-page flex items-center justify-between py-4 gap-4">
					<div className="flex items-center gap-3">
						{showBack ? (
							<Button asChild variant="ghost" size="sm">
								<Link to="/">← Back to Course Overview</Link>
							</Button>
						) : null}
						<div className="leading-tight">
							<div className="text-sm text-muted">University of Cambridge</div>
							<div className="font-semibold tracking-[var(--ls-heading)]">Language Centre</div>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<span className="text-sm text-muted hidden sm:inline">
							{isDark ? "Dark" : "Light"} mode
						</span>
						<Switch checked={isDark} onCheckedChange={toggle} aria-label="Toggle theme" />
					</div>
				</div>
			</header>
		);
	}
}

import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import "./MainMenu.scss";
import Button from "./ui/button.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { handleSpecialLinkClick } from "../lib/scroll.js";

const COMPACT_WIDTH = 1034;

export class UnitMainMenu extends React.Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);

		this.state = {
			menuHighlight: null,
			mobileOpen: false,
			compactMode: false,
		};

		this._scrollTicking = false;
	}

	componentDidMount() {
		this.updateHighlight();
		this.updateCompactMode();

		this.scrollHandler = () => {
			if (this._scrollTicking) return;
			this._scrollTicking = true;

			setTimeout(() => {
				this.updateHighlight();
				this._scrollTicking = false;
			}, 150);
		};

		this.resizeHandler = () => {
			this.updateCompactMode();
			this.updateHighlight();
		};

		document.addEventListener("scroll", this.scrollHandler, { passive: true });
		window.addEventListener("resize", this.resizeHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scrollHandler);
		window.removeEventListener("resize", this.resizeHandler);
	}

	updateCompactMode() {
		const shouldCompact = window.innerWidth <= COMPACT_WIDTH;

		if (shouldCompact !== this.state.compactMode) {
			this.setState({
				compactMode: shouldCompact,
				mobileOpen: shouldCompact ? this.state.mobileOpen : false,
			});
		}
	}

	updateHighlight() {
		const { navItems } = this.props;
		const mainMenu = document.getElementById("mainMenu");
		if (!mainMenu || !Array.isArray(navItems) || !navItems.length) return;

		const mainMenuBottom = mainMenu.getBoundingClientRect().bottom;
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

		const candidates = [];

		for (const item of navItems) {
			const target = document.getElementById(item.anchorId);
			if (!target) continue;

			const rect = target.getBoundingClientRect();
			if (rect.top >= mainMenuBottom && rect.top < viewportHeight) {
				candidates.push({ key: item.key, top: rect.top });
			}
		}

		if (candidates.length) {
			candidates.sort((a, b) => a.top - b.top);
			const best = candidates[0].key;
			if (this.state.menuHighlight !== best) {
				this.setState({ menuHighlight: best });
			}
		}
	}

	toggleMobileMenu = () => {
		this.setState((prev) => ({ mobileOpen: !prev.mobileOpen }));
	};

	handleNavClick = (e) => {
		handleSpecialLinkClick(e);
		if (this.state.mobileOpen) this.setState({ mobileOpen: false });
	};

	render() {
		const { navItems } = this.props;
		const { mobileOpen, menuHighlight, compactMode } = this.state;
		const { isDark, toggle } = this.context;

		const hasNav = Array.isArray(navItems) && navItems.length;

		const topMenu = [];
		const mobileMenuItems = [];

		if (hasNav) {
			for (const item of navItems) {
				const highlight = menuHighlight === item.key;
				const href = `#${item.anchorId}`;

				topMenu.push(
					<li className={highlight ? "highlight" : ""} id={item.key} key={item.key}>
						<a className="special-anchor nav nav-link" href={href} onClick={this.handleNavClick}>
							{item.label}
						</a>
					</li>
				);

				mobileMenuItems.push(
					<li key={`mobile-${item.key}`} className={highlight ? "highlight" : ""}>
						<a href={href} className="nav-link nav-link-mobile nav special-anchor" onClick={this.handleNavClick}>
							{item.label}
						</a>
					</li>
				);
			}
		}

		const themeIcon = isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />;
		const themeTitle = isDark ? "Switch to light mode" : "Switch to dark mode";

		return (
			<header className={`main-menu ${compactMode ? "is-compact" : ""}`} id="mainMenu">
				<div className="menu-root w-100">
					<div className="menu-flex">
						<div className="menu-left">
							<Link to="/" className="nav-title-link" onClick={() => { if (mobileOpen) this.setState({ mobileOpen: false }); }}>
								<div className="nav-title-small">University of Cambridge</div>
								<div className="nav-title-large">Language Centre</div>
							</Link>
						</div>

						{/* Desktop nav (never wraps; hidden in compact mode) */}
						{(hasNav && !compactMode) ? (
							<ul className="menu-right">
								{topMenu}
							</ul>
						) : (
							<div className="menu-right" />
						)}

						{/* Actions: burger inboard, theme rightmost */}
						<div className="menu-actions">
							{(hasNav && compactMode) ? (
								<button
									type="button"
									className={`menu-toggle-button ${mobileOpen ? "is-open" : ""}`}
									aria-label="Toggle navigation menu"
									aria-expanded={mobileOpen}
									onClick={this.toggleMobileMenu}
								>
									{!mobileOpen ? <Menu aria-hidden="true" /> : <X aria-hidden="true" />}
								</button>
							) : null}

							<Button className="size-9" variant="ghost" size="sm" onClick={toggle} title={themeTitle} aria-label={themeTitle}>
								{themeIcon}
							</Button>
						</div>
					</div>
				</div>

				{/* Mobile dropdown nav */}
				{(hasNav && compactMode) ? (
					<nav className={`mobile-menu ${mobileOpen ? "open" : ""}`} aria-label="Unit navigation mobile">
						<ul className="mobile-menu-list">
							{mobileMenuItems}
						</ul>
					</nav>
				) : null}
			</header>
		);
	}
}

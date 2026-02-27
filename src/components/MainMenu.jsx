import "./MainMenu.scss";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./ui/navigation-menu.jsx";
import { Link } from "react-router-dom";
import { handleSpecialLinkClick } from "../utility.js";
import IconButton from "./IconButton.jsx";
import * as React from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export class MainMenu extends React.Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);

		this.state = {
			menuHighlight: null,
			mobileOpen: false,
		};

		this.scrollHandler = null;
		this.resizeHandler = null;

		this._highlightThrottleRunning = false;
	}

	componentDidMount() {
		if (!this.hasNav()) return;

		this.updateHighlight();
		this.attachListeners();
	}

	componentDidUpdate(prevProps) {
		const hadNav = Array.isArray(prevProps.navItems) && prevProps.navItems.length > 0;
		const hasNav = this.hasNav();

		// Nav added after mount
		if (!hadNav && hasNav) {
			this.updateHighlight();
			this.attachListeners();
		}

		// Nav removed after mount
		if (hadNav && !hasNav) {
			this.detachListeners();
			if (this.state.mobileOpen || this.state.menuHighlight !== null) {
				this.setState({ mobileOpen: false, menuHighlight: null });
			}
		}
	}

	componentWillUnmount() {
		this.detachListeners();
	}

	hasNav() {
		const { navItems } = this.props;
		return Array.isArray(navItems) && navItems.length > 0;
	}

	attachListeners() {
		if (!this.scrollHandler) {
			this.scrollHandler = () => {
				if (this._highlightThrottleRunning) return;
				this._highlightThrottleRunning = true;

				setTimeout(() => {
					this.updateHighlight();
					this._highlightThrottleRunning = false;
				}, 200);
			};

			document.addEventListener("scroll", this.scrollHandler, { passive: true });
		}

		if (!this.resizeHandler) {
			this.resizeHandler = () => {
				// If we resize up to desktop, close mobile menu
				if (window.innerWidth >= 1035 && this.state.mobileOpen) {
					this.setState({ mobileOpen: false });
				}
				this.updateHighlight();
			};

			window.addEventListener("resize", this.resizeHandler);
		}
	}

	detachListeners() {
		if (this.scrollHandler) {
			document.removeEventListener("scroll", this.scrollHandler);
			this.scrollHandler = null;
		}

		if (this.resizeHandler) {
			window.removeEventListener("resize", this.resizeHandler);
			this.resizeHandler = null;
		}
	}

	updateHighlight() {
		const { navItems } = this.props;
		if (!Array.isArray(navItems) || navItems.length === 0) return;

		const mainMenu = document.getElementById("mainMenu");
		if (!mainMenu) return;

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

		if (!candidates.length) return;

		candidates.sort((a, b) => a.top - b.top);
		const best = candidates[0].key;

		if (this.state.menuHighlight !== best) {
			this.setState({ menuHighlight: best });
		}
	}

	toggleMobileMenu = () => {
		this.setState((prev) => ({ mobileOpen: !prev.mobileOpen }));
	};

	handleNavClick = (e) => {
		handleSpecialLinkClick(e);

		if (this.state.mobileOpen) {
			this.setState({ mobileOpen: false });
		}
	};

	render() {
		const { navItems } = this.props;
		const { menuHighlight, mobileOpen } = this.state;

		const hasNav = this.hasNav();

		// ✅ Drive icon/title directly from ThemeContext (no DOM reads)
		const { isDark, toggle } = this.context;
		const theme = isDark ? "sun" : "moon";
		const themeTitle = isDark ? "Switch to light mode" : "Switch to dark mode";

		const topMenu = [];
		const mobileMenuItems = [];

		if (hasNav) {
			for (const item of navItems) {
				const highlight = menuHighlight === item.key;
				const href = `#${item.anchorId}`;

				topMenu.push(
					<NavigationMenuItem
						className={highlight ? "highlight" : ""}
						id={item.key}
						key={item.key}
					>
						<NavigationMenuLink asChild>
							<a
								className="special-anchor nav nav-link"
								href={href}
								onClick={this.handleNavClick}
							>
								{item.label}
							</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				);

				mobileMenuItems.push(
					<li key={`mobile-${item.key}`} className={highlight ? "highlight" : ""}>
						<a
							href={href}
							className="nav-link nav-link-mobile nav special-anchor"
							onClick={this.handleNavClick}
						>
							{item.label}
						</a>
					</li>
				);
			}
		}

		return (
			<header className="main-menu" id="mainMenu">
				<NavigationMenu className="menu-root w-100">
					<div className="menu-flex">
						{/* LEFT — Title / brand */}
						<NavigationMenuList className="menu-left">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										to="/"
										className="special-anchor nav nav-title"
										onClick={() => {
											if (this.state.mobileOpen) {
												this.setState({ mobileOpen: false });
											}
										}}
									>
										<div className="nav-title-small">University of Cambridge</div>
										<div className="nav-title-large">Language Centre</div>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>

						{/* DESKTOP — Right-hand nav (only if nav exists) */}
						{hasNav ? (
							<NavigationMenuList className="menu-right">
								{topMenu}
							</NavigationMenuList>
						) : null}

						{/* RIGHT — Actions: burger (inboard, only if nav) + theme toggle (rightmost) */}
						<div className="menu-actions">
							{hasNav ? (
								<button
									type="button"
									className={`menu-toggle-button ${mobileOpen ? "is-open" : ""}`}
									aria-label="Toggle navigation menu"
									aria-expanded={mobileOpen}
									onClick={this.toggleMobileMenu}
								>
									{!mobileOpen ? (
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M4 6h16M4 12h16M4 18h16" />
										</svg>
									) : (
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M6 6l12 12M18 6L6 18" />
										</svg>
									)}
								</button>
							) : null}

							<IconButton
								className="size-9"
								variant="ghost"
								onClick={toggle}
								size="icon"
								theme={theme}
								title={themeTitle}
							/>
						</div>
					</div>
				</NavigationMenu>

				{/* MOBILE DROPDOWN NAV (only if nav exists) */}
				{hasNav ? (
					<nav
						className={`mobile-menu ${mobileOpen ? "open" : ""}`}
						aria-label="Navigation mobile"
					>
						<ul className="mobile-menu-list">
							{mobileMenuItems}
						</ul>
					</nav>
				) : null}
			</header>
		);
	}
}
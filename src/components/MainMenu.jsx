import "./MainMenu.scss";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./ui/navigation-menu.jsx";
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
		window.__lastKnownScrollPosition = 0;
	}

	componentDidMount = () => {
		const updateHighlight = () => {
			const { navItems } = this.props;
			const mainMenu = document.getElementById("mainMenu");
			if (!mainMenu || !Array.isArray(navItems) || !navItems.length) return;

			const mainMenuRect = mainMenu.getBoundingClientRect();
			const mainMenuBottom = mainMenuRect.bottom;
			const html = document.documentElement;
			const viewportHeight = window.innerHeight || html.clientHeight;

			const candidates = [];

			for (const item of navItems) {
				const target = document.getElementById(item.anchorId);
				if (!target) continue;

				const rect = target.getBoundingClientRect();
				if (rect.top >= mainMenuBottom && rect.top < viewportHeight) {
					candidates.push({
						key: item.key,
						top: rect.top,
					});
				}
			}

			if (candidates.length > 0) {
				candidates.sort((a, b) => a.top - b.top);
				const best = candidates[0].key;

				if (this.state.menuHighlight !== best) {
					this.setState({ menuHighlight: best });
				}
			}
		};

		let running = false;

		this.scrollHandler = () => {
			window.__lastKnownScrollPosition = window.scrollY;

			if (running) return;
			running = true;

			setTimeout(() => {
				updateHighlight();
				running = false;
			}, 200);
		};

		document.addEventListener("scroll", this.scrollHandler, {
			passive: true,
		});

		this.resizeHandler = () => {
			// If we resize up to desktop, close mobile menu
			if (window.innerWidth >= 1035 && this.state.mobileOpen) {
				this.setState({ mobileOpen: false });
			}
			updateHighlight();
		};

		window.addEventListener("resize", this.resizeHandler);

		updateHighlight();
	};

	componentWillUnmount() {
		document.removeEventListener("scroll", this.scrollHandler);
		window.removeEventListener("resize", this.resizeHandler);
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

	render = () => {
		const { navItems } = this.props;
		const { menuHighlight, mobileOpen } = this.state;

		if (!Array.isArray(navItems)) return null;

		const topMenu = [];
		const mobileMenuItems = [];

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

		let theme = "moon";
		if (typeof document !== "undefined") {
			if (document.documentElement.classList.contains("dark")) {
				theme = "sun";
			}
		}

		const { toggle } = this.context;

		return (
			<header className="main-menu" id="mainMenu">
				<NavigationMenu className="menu-root w-100">
					<div className="menu-flex">
						{/* LEFT — Title / brand */}
						<NavigationMenuList className="menu-left">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<a
										className="special-anchor nav nav-title"
										href="#special-anchor-top"
										onClick={this.handleNavClick}
									>
										<div className="nav-title-small">University of Cambridge</div>
										<div className="nav-title-large">Language Centre</div>
									</a>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>

						{/* DESKTOP — Right-hand nav */}
						<NavigationMenuList className="menu-right">
							{topMenu}
						</NavigationMenuList>

						{/* RIGHT — Actions: hamburger (inboard) + theme toggle (rightmost) */}
						<div className="menu-actions">
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

							<IconButton
								className="size-9"
								variant="ghost"
								onClick={toggle}
								size="icon"
								theme={theme}
								title={
									theme === "moon"
										? "Switch to dark mode"
										: "Switch to light mode"
								}
							/>
						</div>
					</div>
				</NavigationMenu>

				{/* MOBILE DROPDOWN NAV */}
				<nav
					className={`mobile-menu ${mobileOpen ? "open" : ""}`}
					aria-label="Unit navigation mobile"
				>
					<ul className="mobile-menu-list">
						{mobileMenuItems}
					</ul>
				</nav>
			</header>
		);
	};
}

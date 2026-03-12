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

		if (!hadNav && hasNav) {
			this.updateHighlight();
			this.attachListeners();
		}

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
						className={highlight ? "border-b-2 border-[rgb(var(--primary))]" : "border-b-2 border-transparent"}
						id={item.key}
						key={item.key}
					>
						<NavigationMenuLink asChild>
							<a
								className="special-anchor nav nav-link rounded-md px-2 py-1 text-[0.95rem] text-[rgb(var(--text))] transition-colors hover:bg-[rgb(var(--surface-2))]"
								href={href}
								onClick={this.handleNavClick}
							>
								{item.label}
							</a>
						</NavigationMenuLink>
					</NavigationMenuItem>
				);

				mobileMenuItems.push(
					<li
						key={`mobile-${item.key}`}
						className={
							highlight
								? "border-l-2 border-[rgb(var(--primary))] border-b border-black/5 pl-3"
								: "border-b border-black/5 pl-3 last:border-b-0"
						}
					>
						<a
							href={href}
							className={
								highlight
									? "nav-link-mobile nav special-anchor block py-2 text-[0.95rem] font-semibold text-[rgb(var(--primary))] no-underline transition-colors hover:bg-[rgb(var(--surface-2))]"
									: "nav-link-mobile nav special-anchor block py-2 text-[0.95rem] text-[rgb(var(--text))] no-underline transition-colors hover:bg-[rgb(var(--surface-2))]"
							}
							onClick={this.handleNavClick}
						>
							{item.label}
						</a>
					</li>
				);
			}
		}

		return (
			<header
				className="fixed left-0 right-0 top-0 z-[9998] w-full border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-1))] px-4 py-3 text-[var(--foreground)] backdrop-blur-[12px] dark:border-[rgb(var(--night-700))] dark:bg-[rgb(var(--night-950))]"
				id="mainMenu"
			>
				<NavigationMenu className="block w-full max-w-none">
					<div className="flex w-full items-center justify-between gap-3">
						<NavigationMenuList className="flex flex-none items-center gap-4">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										to="../"
										className="special-anchor nav nav-title whitespace-nowrap rounded-md px-1 py-1"
										onClick={() => {
											if (this.state.mobileOpen) {
												this.setState({ mobileOpen: false });
											}
										}}
									>
										<div className="nav-title-small text-sm text-[rgb(var(--text-muted))] dark:text-[rgb(var(--night-200))]">
											University of Cambridge
										</div>
										<div className="nav-title-large text-lg font-semibold tracking-[var(--ls-heading)] text-[rgb(var(--text))] dark:text-[rgb(var(--night-50))]">
											Language Centre
										</div>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>

						{hasNav ? (
							<NavigationMenuList className="ml-auto hidden items-center justify-end gap-4 flex-nowrap min-[1035px]:flex">
								{topMenu}
							</NavigationMenuList>
						) : null}

						<div className="ml-3 flex items-center gap-2 min-[1035px]:ml-3">
							{hasNav ? (
								<button
									type="button"
									className="inline-flex items-center justify-center rounded-full p-[0.35rem] text-[rgb(var(--text))] transition-colors hover:bg-[rgb(var(--surface-2))] dark:text-[rgb(var(--night-50))] dark:hover:bg-white/10 min-[1035px]:hidden"
									aria-label="Toggle navigation menu"
									aria-expanded={mobileOpen}
									onClick={this.toggleMobileMenu}
								>
									{!mobileOpen ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											aria-hidden="true"
											className="block h-6 w-6 fill-none stroke-current stroke-2"
										>
											<path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											aria-hidden="true"
											className="block h-6 w-6 fill-none stroke-current stroke-2"
										>
											<path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
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

				{hasNav ? (
					<nav
						className={
							mobileOpen
								? "mt-3 block max-h-[500px] overflow-hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-1))] transition-[max-height] duration-200 ease-in min-[1035px]:hidden dark:border-[rgb(var(--night-700))] dark:bg-[rgb(var(--night-950))]"
								: "mt-3 block max-h-0 overflow-hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-1))] transition-[max-height] duration-200 ease-in min-[1035px]:hidden dark:border-[rgb(var(--night-700))] dark:bg-[rgb(var(--night-950))]"
						}
						aria-label="Navigation mobile"
					>
						<ul className="m-0 list-none px-0 py-[0.35rem]">
							{mobileMenuItems}
						</ul>
					</nav>
				) : null}
			</header>
		);
	}
}
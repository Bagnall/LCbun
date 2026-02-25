export function scrollToId(id) {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function handleSpecialLinkClick(e) {
	if (!e) return;
	const href = e.currentTarget && e.currentTarget.getAttribute ? e.currentTarget.getAttribute("href") : null;
	if (!href || href[0] !== "#") return;
	e.preventDefault();
	const id = href.slice(1);
	scrollToId(id);
}

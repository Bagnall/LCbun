export function handleSpecialLinkClick(e) {
	if (!e) return;
	const el = e.currentTarget;
	if (!el || !el.getAttribute) return;

	const href = el.getAttribute("href");
	if (!href || href[0] !== "#") return;

	e.preventDefault();

	const id = href.slice(1);
	const target = document.getElementById(id);
	if (target) {
		target.scrollIntoView({ behavior: "smooth", block: "start" });
	}
}

import { Link } from "react-router-dom";

export default function SiteFooter({ withLinks = true }) {
	return (
		<footer className="border-t border-border bg-surface1 mt-12">
			<div className="container-page py-6 flex items-center justify-between gap-4">
				<div className="text-sm text-muted">
					© {new Date().getFullYear()} University of Cambridge Language Centre
				</div>
				{withLinks ? (
					<div className="flex gap-4 text-sm">
						<Link to="/syllabus">Syllabus</Link>
						<Link to="/credits">Credits</Link>
					</div>
				) : (
					<div />
				)}
			</div>
		</footer>
	);
}

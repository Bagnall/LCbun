import * as React from "react";
import { Link } from "react-router-dom";
import { MainMenu } from "../components/MainMenu.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Button from "../components/ui/button.jsx";

export default class CreditsPage extends React.Component {
	render() {
		return (
			<div className="min-h-screen flex flex-col bg-bg text-text">
				<MainMenu />
				<main className="flex-1 pt-24">
					<section className="py-10">
						<div className="container-page">
							<h1 className="text-[var(--fs-h1)] tracking-[var(--ls-heading)] font-semibold">Credits</h1>
							<p className="mt-3 text-muted max-w-measure">
								Placeholder credits page. Add acknowledgements, authors, and licences here.
							</p>
							<div className="mt-6">
								<Button asChild variant="ghost">
									<Link to="/">← Back to course</Link>
								</Button>
							</div>
						</div>
					</section>
				</main>
				<SiteFooter withLinks />
			</div>
		);
	}
}

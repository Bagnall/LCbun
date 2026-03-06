import * as React from "react";
import { Link } from "react-router-dom";
import { MainMenu } from "../components/MainMenu.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Button from "../components/ui/button.jsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card.jsx";
import { getUnits } from "../data/course.js";
import heroBanner from "@/assets/hero-banner.svg";


function Section({ title, children }) {
	return (
		<section className="py-10">
			<div className="container-page">
				{title ? (
					<h2 className="text-[var(--fs-h2)] tracking-[var(--ls-heading)] leading-[var(--lh-snug)] mb-4">
						{title}
					</h2>
				) : null}
				{children}
			</div>
		</section>
	);
}

export default class LandingPage extends React.Component {
	render() {
		const units = getUnits();
		return (
			<div className="min-h-screen flex flex-col bg-bg text-text pt-24">
				<MainMenu />

				<main className="flex-1">
					<section className="py-10">
						<div className="container-page">
							<div
								className="relative overflow-hidden rounded-xl border border-border bg-surface1 shadow-card"
								style={{
									backgroundImage: `url("${heroBanner}")`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundRepeat: "no-repeat",
								}}
							>
								<div className="absolute inset-0 bg-[rgb(0_0_0/0.28)]" />
								<div className="relative px-6 py-16 sm:px-10 sm:py-20 text-center">
									<div className="text-sm text-[rgb(255_255_255/0.90)] mb-3">
										University of Cambridge Language Centre
									</div>
									<h1 className="text-[var(--fs-display)] leading-[var(--lh-tight)] tracking-[var(--ls-heading)] font-semibold text-white">
										Title
									</h1>
									<p className="mt-4 text-[length:var(--fs-body-lg)] text-[rgb(255_255_255/0.90)] max-w-measure mx-auto">
										A comprehensive course for beginners
									</p>

								</div>
							</div>
						</div>
					</section>

					<Section title="About this course">
						<div id="about" className="prose">
							<p className="text-muted">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed
								semper orci. Donec vel sapien sed lorem dictum tincidunt.
							</p>
							<p className="text-muted mt-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
								non nisl sed arcu consequat tristique. Vivamus posuere, nisi ut
								facilisis ultrices, justo est fermentum odio.
							</p>
							<p className="text-muted mt-4">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
								erat volutpat. Sed id turpis sit amet lorem sodales feugiat.
							</p>
						</div>
					</Section>

					<Section title="Course units">
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{units.map((u) => (
								<Card key={u.id} className="flex flex-col card-hover">
									<CardHeader>
										<CardTitle>{u.title}</CardTitle>
										<CardDescription>{u.description}</CardDescription>
									</CardHeader>
									<CardContent className="text-sm text-muted">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</CardContent>
									<CardFooter className="mt-auto">
										<Button asChild variant="secondary" size="sm">
											<Link to={`/unit/${u.id}`}>Open</Link>
										</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</Section>
				</main>

				<SiteFooter withLinks />
			</div>
		);
	}
}

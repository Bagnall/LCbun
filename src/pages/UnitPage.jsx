import * as React from "react";
import { useParams } from "react-router-dom";
import { MainMenu } from "../components/MainMenu.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion.jsx";
import { accordionSections, getUnits } from "../data/course.js";

function slugify(name) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function getUnitById(id) {
	return getUnits().find((u) => u.id === id) || { title: "Unit", description: "" };
}

class UnitPageInner extends React.Component {
	render() {
		const unitId = this.props.unitId;
		const unit = getUnitById(unitId);

		const navItems = accordionSections.map((name) => {
			const slug = slugify(name);
			return {
				key: `menuItem-${slug}`,
				label: name,
				anchorId: `special-anchor-${slug}`,
			};
		});

		return (
			<div className="min-h-screen flex flex-col bg-bg text-text">
				<div id="special-anchor-top" className="special-anchor" />
				<MainMenu navItems={navItems} />

				<main className="flex-1 pt-24">
					<section className="py-10">
						<div className="container-page">
							<h1 className="text-[var(--fs-h1)] tracking-[var(--ls-heading)] leading-[var(--lh-snug)] font-semibold">
								{unit.title}
							</h1>
							<p className="mt-3 text-muted max-w-measure">{unit.description} Lorem ipsum dolor sit amet.</p>
						</div>
					</section>

					<section className="py-8">
						<div className="container-page">
							<h2 className="text-[var(--fs-h3)] tracking-[var(--ls-heading)] leading-[var(--lh-snug)] font-semibold">
								Learning Objectives
							</h2>
							<p className="mt-2 text-muted">By the end of this unit, you will be able to:</p>
							<ul className="mt-4 list-disc pl-6 text-muted max-w-measure">
								<li>Lorem ipsum dolor sit</li>
								<li>Consectetur adipiscing elit</li>
								<li>Sed do eiusmod tempor</li>
								<li>Ut enim ad minim</li>
								<li>Duis aute irure</li>
							</ul>
						</div>
					</section>

					<section className="py-8">
						<div className="container-page">
							<h2 className="text-[var(--fs-h3)] tracking-[var(--ls-heading)] leading-[var(--lh-snug)] font-semibold mb-4">
								Content
							</h2>

							<Accordion type="multiple" defaultValue={["Dialogues", "Vocabulary"]}>
								{accordionSections.map((name) => {
									const slug = slugify(name);
									return (
										<div key={name}>
											<div id={`special-anchor-${slug}`} className="special-anchor" />
											<AccordionItem value={name} className="scroll-mt-28">
												<AccordionTrigger>{name}</AccordionTrigger>
												<AccordionContent>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
													posuere, metus non commodo luctus, lacus arcu egestas neque,
													vitae placerat lorem magna in neque.
												</AccordionContent>
											</AccordionItem>
										</div>
									);
								})}
							</Accordion>
						</div>
					</section>
				</main>

				<SiteFooter withLinks={true} />
			</div>
		);
	}
}

export default function UnitPage() {
	const { unitId } = useParams();
	return <UnitPageInner unitId={unitId} />;
}

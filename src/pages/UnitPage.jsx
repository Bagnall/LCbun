import * as React from "react";
import { useParams } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion.jsx";
import { accordionSections, getUnits } from "../data/course.js";

function getUnitById(id) {
	return getUnits().find((u) => u.id === id) || { title: "Unit", description: "" };
}

class UnitPageInner extends React.Component {
	render() {
		const unitId = this.props.unitId;
		const unit = getUnitById(unitId);

		return (
			<div className="min-h-screen flex flex-col bg-bg text-text">
				<SiteHeader showBack />

				<main className="flex-1">
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
								{accordionSections.map((name) => (
									<AccordionItem key={name} value={name}>
										<AccordionTrigger>{name}</AccordionTrigger>
										<AccordionContent>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
											posuere, metus non commodo luctus, lacus arcu egestas neque,
											vitae placerat lorem magna in neque.
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</section>
				</main>

				<SiteFooter withLinks={false} />
			</div>
		);
	}
}

export default function UnitPage() {
	const { unitId } = useParams();
	return <UnitPageInner unitId={unitId} />;
}

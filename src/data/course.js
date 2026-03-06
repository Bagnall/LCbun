export function getUnits() {
	return Array.from({ length: 15 }, (_, i) => {
		const n = i + 1;
		return {
			id: String(n),
			title: `Unit ${n}`,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		};
	});
}


export const accordionSections = [
	"Dialogues",
	"Language Notes",
	"Vocabulary",
	"Reading",
	"Writing",
	"Activities",
	"AI Practice Prompts",
	"Cultural Notes",
];

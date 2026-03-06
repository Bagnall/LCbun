import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary:
					"bg-[rgb(var(--btn-primary-bg))] text-[rgb(var(--btn-primary-fg))] hover:bg-[rgb(var(--btn-primary-bg-hover))] shadow-sm",
				secondary:
					"bg-[rgb(var(--btn-secondary-bg))] text-[rgb(var(--btn-secondary-fg))] hover:bg-[rgb(var(--btn-secondary-bg-hover))] shadow-sm",
				ghost:
					"bg-transparent text-text border border-border hover:bg-[rgb(var(--secondary)/0.10)] hover:border-borderStrong",
				link: "bg-transparent text-[rgb(var(--link))] hover:text-[rgb(var(--link-hover))] underline underline-offset-4",
			},
			size: {
				sm: "h-[var(--btn-h-sm)] px-[var(--btn-px-sm)] rounded-md text-[length:var(--fs-label)]",
				md: "h-[var(--btn-h-md)] px-[var(--btn-px-md)] rounded-md text-[length:var(--fs-body)]",
				lg: "h-[var(--btn-h-lg)] px-[var(--btn-px-lg)] rounded-lg text-[length:var(--fs-body-lg)]",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	}
);

export default function Button({ className, variant, size, asChild = false, ...props }) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
	);
}

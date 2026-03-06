import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils.js";

export function Accordion({ className, ...props }) {
	return <AccordionPrimitive.Root className={cn("w-full", className)} {...props} />;
}

export function AccordionItem({ className, ...props }) {
	return (
		<AccordionPrimitive.Item
			className={cn("border border-border rounded-lg mb-3 overflow-hidden bg-surface1", className)}
			{...props}
		/>
	);
}

export function AccordionTrigger({ className, children, ...props }) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				className={cn(
					"flex flex-1 items-center justify-between px-4 py-3 text-left text-[var(--fs-body)] font-medium hover:bg-surface2 transition-colors",
					className
				)}
				{...props}
			>
				{children}
				<ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

export function AccordionContent({ className, ...props }) {
	return <AccordionPrimitive.Content className={cn("px-4 pb-4 text-sm text-muted", className)} {...props} />;
}

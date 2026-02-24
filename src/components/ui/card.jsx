import { cn } from "../../lib/utils.js";

export function Card({ className, ...props }) {
  return (
	<div
	  className={cn("rounded-lg border border-border bg-surface1 shadow-card hover:border-borderStrong", className)}
	  {...props}
	/>
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("p-6 pb-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return (
	<h3
	  className={cn(
		"text-[var(--fs-h4)] leading-[var(--lh-snug)] tracking-[var(--ls-heading)]",
		className
	  )}
	  {...props}
	/>
  );
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("mt-1 text-sm text-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-3", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

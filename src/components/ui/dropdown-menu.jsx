import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/utils.js";

export function DropdownMenu(props) {
	return <DropdownMenuPrimitive.Root {...props} />;
}

export function DropdownMenuTrigger({ className, ...props }) {
	return <DropdownMenuPrimitive.Trigger className={cn(className)} {...props} />;
}

export function DropdownMenuContent({ className, align = "end", sideOffset = 8, ...props }) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"z-50 min-w-[12rem] overflow-hidden rounded-lg border border-border bg-surface1 shadow-md p-1",
					className
				)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

export function DropdownMenuItem({ className, inset = false, ...props }) {
	return (
		<DropdownMenuPrimitive.Item
			className={cn(
				"relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors",
				"focus:bg-surface2 data-[highlighted]:bg-surface2",
				inset ? "pl-8" : "",
				className
			)}
			{...props}
		/>
	);
}

export function DropdownMenuSeparator({ className, ...props }) {
	return (
		<DropdownMenuPrimitive.Separator
			className={cn("my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}

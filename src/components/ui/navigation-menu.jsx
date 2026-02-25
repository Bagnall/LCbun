import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "../../lib/utils.js";

export function NavigationMenu({ className, ...props }) {
	return (
		<NavigationMenuPrimitive.Root
			className={cn("relative z-10 flex w-full justify-center", className)}
			{...props}
		/>
	);
}

export function NavigationMenuList({ className, ...props }) {
	return (
		<NavigationMenuPrimitive.List
			className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)}
			{...props}
		/>
	);
}

export function NavigationMenuItem(props) {
	return <NavigationMenuPrimitive.Item {...props} />;
}

export function NavigationMenuLink({ className, ...props }) {
	return (
		<NavigationMenuPrimitive.Link
			className={cn("block select-none outline-none", className)}
			{...props}
		/>
	);
}

import * as React from "react";
import Button from "./ui/button.jsx";
import { Moon, Sun } from "lucide-react";

export default class IconButton extends React.Component {
	render() {
		const {
			theme = "moon",
			title,
			onClick,
			className = "",
			variant = "ghost",
			size = "sm",
		} = this.props;

		const Icon = theme === "sun" ? Sun : Moon;

		return (
			<Button
				className={className}
				variant={variant}
				size={size}
				onClick={onClick}
				title={title}
				aria-label={title}
			>
				<Icon className="h-5 w-5" />
			</Button>
		);
	}
}

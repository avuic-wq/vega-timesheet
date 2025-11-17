"use client";

import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { ButtonVariant } from "@/src/lib/types";
import { getButtonStyle } from "./utils";

interface Props {
	children: ReactNode;
	type?: "button" | "submit";
	variant?: ButtonVariant;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled?: boolean;
	className?: string;
}

const Button = ({
	children,
	type = "button",
	variant = "primary",
	onClick,
	isDisabled = false,
	className,
}: Props) => {
	const variantStyle = getButtonStyle(variant, isDisabled);
	const style =
		variant === "custom"
			? twMerge(isDisabled ? "cursor-not-allowed" : "cursor-pointer", className)
			: twMerge(variantStyle, className);

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className={style}
		>
			{children}
		</button>
	);
};

export default Button;

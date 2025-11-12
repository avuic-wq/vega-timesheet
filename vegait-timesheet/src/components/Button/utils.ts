import { twMerge } from "tailwind-merge";
import type { ButtonVariant } from "@/src/lib/types";

export const getButtonStyle = (
	variant: ButtonVariant,
	isDisabled = false,
): string => {
	const commonStyle = `flex items-center justify-center m-auto px-20 py-3 rounded-[24px] text-white`;

	const variantSpecificStyle = {
		primary: "bg-black",
		secondary: "",
		danger: "bg-red",
		custom: undefined,
	};

	const disabledStyle = {
		primary: "bg-grey-500 cursor-not-allowed",
		secondary: ``,
		danger: "bg-grey-200 cursor-not-allowed",
		custom: undefined,
	};

	return twMerge(
		commonStyle,
		variantSpecificStyle[variant],
		isDisabled ? disabledStyle[variant] : undefined,
	);
};

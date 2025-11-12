import type { ButtonVariant } from "@/src/lib/types";

type ButtonStyle = {
	primary: string;
	secondary: string;
	danger: string;
};

export const getButtonStyle = (
	variant: ButtonVariant,
	isDisabled = false,
): string => {
	const styles: ButtonStyle = {
		primary: `flex items-center justify-center m-auto px-20 py-3 rounded-[24px] ${isDisabled ? "bg-grey-500" : "bg-black"} text-white cursor-pointer`,
		secondary: "",
		danger: "",
	};

	return styles[variant];
};

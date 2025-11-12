import { twMerge } from "tailwind-merge";

export const getFilterStyle = (
	isDisabled: boolean = false,
	isSelected: boolean = false,
) => {
	const commonStyle =
		"flex justify-center items-center rounded-[16px] bg-primary min-w-[40px] min-h-[40px] cursor-pointer";
	const disabledStyle = "bg-grey-200 cursor-not-allowed";
	const selectedStyle = "border-[1.5px] border-red";

	return twMerge(
		commonStyle,
		isDisabled ? disabledStyle : undefined,
		isSelected ? selectedStyle : undefined,
	);
};

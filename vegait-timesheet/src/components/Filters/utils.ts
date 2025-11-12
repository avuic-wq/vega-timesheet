import { twMerge } from "tailwind-merge";

export const getFilterStyle = (
	isDisabled: boolean = false,
	isSelected: boolean = false,
) => {
	const commonStyle =
		"flex justify-center items-center rounded-[16px] bg-primary min-w-[40px] min-h-[40px] cursor-pointer";

	const shadowStyle =
		"shadow-grey-500 hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all";

	const disabledStyle =
		"bg-grey-200 cursor-not-allowed shadow-none hover:shadow-none";

	const selectedStyle = "border-[1.5px] border-red";

	return twMerge(
		commonStyle,
		shadowStyle,
		isDisabled ? disabledStyle : undefined,
		isSelected ? selectedStyle : undefined,
	);
};

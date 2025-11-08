"use client";

import Text from "@/src/components/Text";

type DynamicStyles = {
	button: string;
	text: string;
};

interface ButtonProps {
	text: string;
	type?: "button" | "submit";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	isDisabled?: boolean;
	classNames?: DynamicStyles;
}

const staticStyles =
	"bg-black text-white rounded-[24px] flex items-center justify-center m-auto cursor-pointer";

export default function Button({
	text,
	type = "button",
	onClick,
	isDisabled = false,
	classNames = { button: "", text: "" },
}: ButtonProps) {
	// TO-DO: Refactor Passing CSS classes
	const hasFixedDimensions =
		classNames.button?.includes("w-[") && classNames.button?.includes("h-[");

	const dynamicStyles = {
		button: `${classNames.button} ${isDisabled ? "bg-grey-500" : ""} ${hasFixedDimensions ? "" : "py-3 px-9"}`,
		text: `${classNames.text}`,
	};

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${staticStyles} ${dynamicStyles.button} `}
			disabled={isDisabled}
		>
			<Text value={text} className={dynamicStyles.text} />
		</button>
	);
}

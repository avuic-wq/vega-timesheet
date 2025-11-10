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

const Button = ({
	text,
	type = "button",
	onClick,
	isDisabled = false,
	classNames = { button: "", text: "" },
}: ButtonProps) => {
	// TO-DO: Remove when passing tailwind classes are optimized
	const hasFixedDimensions =
		classNames.button?.includes("w-[") && classNames.button?.includes("h-[");

	const dynamicStyles = {
		button: ` ${isDisabled ? "bg-grey-500" : ""} ${hasFixedDimensions ? "" : "py-3 px-9"} ${classNames.button}`,
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
};

export default Button;

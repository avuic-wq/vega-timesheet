import Text from "./Text";

interface ButtonProps {
	text: string;
	type?: "button" | "submit";
	onClick?: () => void;
	isDisabled?: boolean;
	className?: string;
}

const staticStyles =
	"bg-black text-white rounded-[24px] pt-3 pb-3 pl-9 pr-9 flex items-center justify-center m-auto";

export default function Button({
	text,
	type = "button",
	onClick,
	isDisabled = false,
	className = "",
}: ButtonProps) {
	const dynamicStyles = `${className} ${isDisabled && "bg-grey-500"}`;

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${staticStyles} ${dynamicStyles}`}
			disabled={isDisabled}
		>
			<Text value={text} />
		</button>
	);
}

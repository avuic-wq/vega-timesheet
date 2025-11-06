interface ButtonProps {
	text: string;
	type?: "button" | "submit";
	onClick?: () => void;
	isDisabled?: boolean;
	className?: string;
}

export default function Button({
	text,
	type = "button",
	onClick,
	isDisabled = false,
	className,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`bg-black text-white rounded-[24px] pt-4 pb-4 pl-13 pr-13 flex items-center justify-center m-auto ${className}`}
			disabled={isDisabled}
		>
			{text}
		</button>
	);
}

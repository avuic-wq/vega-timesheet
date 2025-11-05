interface ButtonProps {
	text: string;
	type?: "button" | "submit";
	onClick?: () => void;
}

export default function Button({
	text,
	type = "button",
	onClick,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			className="bg-black text-white rounded-[24px] w-[200px] h-[40px] p-4 flex items-center justify-center m-auto"
		>
			{text}
		</button>
	);
}

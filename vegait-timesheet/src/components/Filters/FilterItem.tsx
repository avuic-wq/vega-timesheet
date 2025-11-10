"use client";

interface Props {
	value: string;
	isSelected: boolean;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	isDisabled?: boolean;
}

export default function FilterItem({
	value,
	isSelected,
	onClick,
	isDisabled = false,
}: Props) {
	const dynamicStyles = `
	${isSelected ? "border-[1.5px] border-red" : ""}
	${isDisabled ? "!bg-grey-200 !cursor-not-allowed" : ""}
	`;

	const handleOnClick = isDisabled ? undefined : onClick;

	return (
		// CHECK: padding or fixed width/height?

		// TO-DO: Replace with button (when tailwind clases are optimized)
		// <Button
		// 	text={value}
		// 	onClick={onClick}
		// 	isDisabled={isDisabled}
		//	classNames
		// />
		// TO-DO: Change style on hover (!isDisabled & !isSelected) (when tailwind clases are optimized)

		<div
			onClick={handleOnClick}
			className={`flex justify-center items-center rounded-[16px] bg-primary w-[40px] h-[40px] cursor-pointer ${dynamicStyles}`}
		>
			{value}
		</div>
	);
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SEARCH_PARAMETERS } from "@/src/lib/consts";

interface Props {
	value: string;
	isDisabled?: boolean;
}

const FilterItem = ({ value, isDisabled = false }: Props) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const selectedFilter =
		searchParams.get(SEARCH_PARAMETERS.LETTER_FILTER) || null;
	const isSelected = selectedFilter === value;

	// CHECK: Could use useTransition
	// const [isPending, startTransition] = useTransition();
	const handleOnSelectFilter = (filter: string): void => {
		const params = new URLSearchParams(searchParams);

		if (filter === selectedFilter) {
			params.delete(SEARCH_PARAMETERS.LETTER_FILTER);
			params.delete(SEARCH_PARAMETERS.PAGINATION);
			router.push(`?${params.toString()}`);
			return;
		}

		if (filter) {
			params.set(SEARCH_PARAMETERS.LETTER_FILTER, filter);
			params.delete(SEARCH_PARAMETERS.PAGINATION);
			router.push(`?${params.toString()}`);

			return;
		}

		params.delete(SEARCH_PARAMETERS.LETTER_FILTER);
		router.push(`?${params.toString()}`);
	};

	const dynamicStyles = `
	${isSelected ? "border-[1.5px] border-red" : ""}
	${isDisabled ? "!bg-grey-200 !cursor-not-allowed" : ""}
	`;

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

		<button
			type="button"
			onClick={(_e) => {
				if (isDisabled) return;
				handleOnSelectFilter(value);
			}}
			className={`flex justify-center items-center rounded-[16px] bg-primary w-[40px] h-[40px] cursor-pointer ${dynamicStyles}`}
		>
			{value}
		</button>
	);
};

export default FilterItem;

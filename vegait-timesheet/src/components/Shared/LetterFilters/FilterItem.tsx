"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/src/components/Shared/Button/Button";
import { SEARCH_PARAMETERS } from "@/src/lib/consts";
import { getFilterStyle } from "./utils";

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
	const filterStyle = getFilterStyle(isDisabled, isSelected);

	// CHECK: Could use useTransition?
	// const [isPending, startTransition] = useTransition();
	const handleOnSelectFilter = (filter: string): void => {
		const params = new URLSearchParams(searchParams);

		if (filter === selectedFilter) {
			params.delete(SEARCH_PARAMETERS.LETTER_FILTER);
			params.delete(SEARCH_PARAMETERS.PAGINATION);
			router.push(`?${params.toString()}`, { scroll: false });
			return;
		}

		if (filter) {
			params.set(SEARCH_PARAMETERS.LETTER_FILTER, filter);
			params.delete(SEARCH_PARAMETERS.PAGINATION);
			router.push(`?${params.toString()}`, { scroll: false });

			return;
		}

		params.delete(SEARCH_PARAMETERS.LETTER_FILTER);
		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<Button
			variant="custom"
			onClick={(_e) => {
				if (isDisabled) return;
				handleOnSelectFilter(value);
			}}
			isDisabled={isDisabled}
			className={filterStyle}
		>
			{value}
		</Button>
	);
};

export default FilterItem;

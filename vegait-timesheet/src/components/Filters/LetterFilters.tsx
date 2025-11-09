"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SEARCH_PARAMETERS } from "@/src/lib/consts";
import FilterItem from "./FilterItem";

const allLettersInAlphabet = Array.from({ length: 26 }, (_, i) =>
	String.fromCharCode(65 + i),
);

interface Props {
	letters: string[];
}

export default function LetterFilters({ letters }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const selectedFilter = searchParams.get("letterFilter") || null;

	// CHECK: Could use useTransition
	const handleOnSelectFilter = (filter: string): void => {
		const params = new URLSearchParams(searchParams);

		if (filter) {
			params.set(SEARCH_PARAMETERS.LETTER_FILTER, filter);
			router.push(`?${params.toString()}`);

			return;
		}

		params.delete(SEARCH_PARAMETERS.LETTER_FILTER);
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="flex justify-between">
			{allLettersInAlphabet.map((letter) => (
				<FilterItem
					key={letter}
					value={letter}
					isSelected={selectedFilter === letter}
					onClick={() => handleOnSelectFilter(letter)}
					isDisabled={!letters.includes(letter)}
				/>
			))}
		</div>
	);
}

"use client";

import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@/src/components/TextField";
import { DEBOUNCE_TIME, SEARCH_PARAMETERS } from "@/src/lib/consts";

export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(searchParams);
		if (e.target.value) {
			params.set(SEARCH_PARAMETERS.SEARCH, e.target.value);
			router.push(`?${params.toString()}`);
			return;
		}

		params.delete(SEARCH_PARAMETERS.SEARCH);
		router.push(`?${params.toString()}`);
	};

	const debouncedSearch = debounce(handleOnSearchChange, DEBOUNCE_TIME.DEFAULT);

	return (
		<div>
			<TextField
				name="search"
				placeholder="Search"
				leftIcon="search"
				onChange={debouncedSearch}
			/>
		</div>
	);
}

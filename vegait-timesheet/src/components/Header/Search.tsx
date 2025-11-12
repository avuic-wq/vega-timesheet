"use client";

import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@/src/components/TextField";
import { DEBOUNCE_TIME, SEARCH_PARAMETERS } from "@/src/lib/consts";

const Search = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(searchParams);
		if (e.target.value) {
			params.set(SEARCH_PARAMETERS.SEARCH, e.target.value);
			params.delete(SEARCH_PARAMETERS.PAGINATION);
			router.push(`?${params.toString()}`, { scroll: false });
			return;
		}

		params.delete(SEARCH_PARAMETERS.SEARCH);
		router.push(`?${params.toString()}`, { scroll: false });
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
};

export default Search;

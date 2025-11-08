"use client";

import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import TextField from "@/src/components/TextField";

export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const params = new URLSearchParams(searchParams);
		if (e.target.value) {
			params.set("search", e.target.value);
		} else {
			params.delete("search");
		}
		router.push(`?${params.toString()}`);
	};
	const debouncedSearch = debounce(handleOnSearchChange, 500);

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

"use client";

import { debounce } from "lodash";
import { useState } from "react";
import TextField from "@/src/components/TextField";

export default function Search() {
	const [searchInput, setSearchInput] = useState("");

	const debouncedSearch = debounce(() => {}, 2000);

	return (
		<div>
			<TextField name="search" placeholder="Search" leftIcon="search" />
		</div>
	);
}

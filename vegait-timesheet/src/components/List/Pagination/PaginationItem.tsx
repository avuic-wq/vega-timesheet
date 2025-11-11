"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createPageParams } from "./utils";

interface Props {
	value: number;
	currentPage: number;
	totalPages: number;
}

const PaginationItem = ({ value, currentPage, totalPages }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isSelected = value === currentPage;

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		const pageParams = createPageParams(page, searchParams);
		router.push(pageParams, { scroll: false });
	};

	return (
		<button
			type="button"
			onClick={() => handlePageChange(value)}
			className={`min-w-[24px] h-[24px] rounded-[12px] cursor-pointer ${isSelected ? "bg-black text-white" : ""}
					`}
		>
			{value}
		</button>
	);
};

export default PaginationItem;

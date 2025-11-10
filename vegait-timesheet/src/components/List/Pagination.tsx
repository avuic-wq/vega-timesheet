// components/Pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import {
	createPageParams,
	getPaginationElementKey,
	getPagingationElements,
} from "./utils";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

export type PagingationConfig = typeof config;

export const config = {
	ALL_PAGES_VISIBLE_THRESHOLD: 7,
	// Number of pages to show on each side of current page
	PAGES_AROUND_CURRENT: 2,
	ELLIPSIS_VALUE: "...",
} as const;

// TO-DO: Clicking on a page doesnt move viewport
export default function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		const pageParams = createPageParams(page, searchParams);
		router.push(pageParams);
	};

	const pagingationElements = useMemo(
		() => getPagingationElements(totalPages, currentPage, config),
		[totalPages, currentPage],
	);

	if (totalPages <= 1) return null;

	// TO-DO: Can I use my button component?
	return (
		<div className="flex items-center justify-center space-x-1">
			<button
				type="button"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<Icon name="chevron-left" />
			</button>

			{pagingationElements.map((page, index) => {
				const isElipsis = typeof page === "string";

				if (isElipsis) {
					return (
						<Text
							key={`${config.ELLIPSIS_VALUE}-${index}`}
							value={config.ELLIPSIS_VALUE}
							className="hover:cursor-default"
						/>
					);
				}

				return (
					<button
						type="button"
						key={getPaginationElementKey(page, index)}
						onClick={() => handlePageChange(page)}
						className={`
						min-w-[32px] h-[32px] rounded-[16px]
						${page === currentPage ? "bg-black text-white" : ""}
					`}
					>
						{page}
					</button>
				);
			})}
			<button
				type="button"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{/* className="w-4 h-4" */}
				<Icon name="chevron-right" />
			</button>
		</div>
	);
}

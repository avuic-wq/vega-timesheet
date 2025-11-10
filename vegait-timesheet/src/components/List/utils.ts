import type { ReadonlyURLSearchParams } from "next/navigation";
import { SEARCH_PARAMETERS } from "@/src/lib/consts";
import type { PagingationConfig } from "./Pagination";

export const createPageParams = (
	pageNumber: number,
	searchParams: ReadonlyURLSearchParams,
) => {
	const params = new URLSearchParams(searchParams);
	params.set(SEARCH_PARAMETERS.PAGE, pageNumber.toString());
	return `?${params.toString()}`;
};

export const getPagingationElements = (
	totalPages: number,
	currentPage: number,
	config: PagingationConfig,
) => {
	const { ALL_PAGES_VISIBLE_THRESHOLD, PAGES_AROUND_CURRENT, ELLIPSIS_VALUE } =
		config;

	// Show all pages if total is below threshold
	if (totalPages <= ALL_PAGES_VISIBLE_THRESHOLD) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const pages: (number | string)[] = [];

	// Calculate when to show ellipsis
	const leftEllipsisThreshold = PAGES_AROUND_CURRENT + 2;
	const rightEllipsisThreshold = totalPages - (PAGES_AROUND_CURRENT + 1);
	const showLeftEllipsis = currentPage > leftEllipsisThreshold;
	const showRightEllipsis = currentPage < rightEllipsisThreshold;

	// First page
	pages.push(1);

	if (showLeftEllipsis) {
		pages.push(ELLIPSIS_VALUE);
	}

	// Page range around current page
	const rangeStart = Math.max(2, currentPage - PAGES_AROUND_CURRENT);
	const rangeEnd = Math.min(currentPage + PAGES_AROUND_CURRENT, totalPages - 1);

	for (let page = rangeStart; page <= rangeEnd; page++) {
		pages.push(page);
	}

	if (showRightEllipsis) {
		pages.push(ELLIPSIS_VALUE);
	}

	// Last page
	pages.push(totalPages);

	return pages;
};

export const getPaginationElementKey = (
	page: string | number,
	index: number,
) => {
	return typeof page === "number" ? `page-${page}` : `ellipsis-${index}`;
};

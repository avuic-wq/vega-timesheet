import { redirect } from "next/navigation";
import type { ReportFiltersData } from "@/src/components/Shared/Filter/types";
import { fetchPaginatedAndFilteredTimelogs } from "@/src/db/TimelogService/service";
import type { QueryPageSettings } from "@/src/lib/types";

export async function getPaginatedAndFilteredTimelogsAction(
	pageSettings: QueryPageSettings,
	filters: ReportFiltersData,
) {
	const { page, itemsPerPage } = pageSettings;

	const { timeLogs, totalCount } = await fetchPaginatedAndFilteredTimelogs(
		pageSettings,
		filters,
	);

	const totalPages = Math.ceil(totalCount / itemsPerPage);
	const isInvalidPage = totalPages > 0 && page > totalPages;

	if (isInvalidPage) {
		// TO-DO: Concat and apply all filters
		const defaultPageParam = "?page=1";
		redirect(`?page=1`);
	}

	return { timeLogs, totalPages };
}

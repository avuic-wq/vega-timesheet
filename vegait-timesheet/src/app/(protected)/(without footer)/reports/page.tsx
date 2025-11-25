import ReportFilters from "@/src/components/Reports/ReportFilters/ReportFilters";
import ReportsTable from "@/src/components/Reports/ReportsTable/ReportsTable";
import Header from "@/src/components/Shared/Header/Header";
import { APP_ROUTES, ITEMS_PER_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import { getClientSelectOptions } from "@/src/lib/utils/getClientSelectOptions";
import { getIndustrySelectOptions } from "@/src/lib/utils/getIndustrySelectOptions";
import { getProjectSelectOptions } from "@/src/lib/utils/getProjectSelectOptions";
import { getUserSelectOptions } from "@/src/lib/utils/getUserSelectOptions";
import { mapDataToRows } from "@/src/lib/utils/mapDataToRows";
import { getAllUsersAction } from "@/src/server-actions/auth/actions";
import { getAllTimelogCategoriesAction } from "@/src/server-actions/categories/actions";
import { getAllClientsAction } from "@/src/server-actions/clients/actions";
import { getAllProjectsAction } from "@/src/server-actions/projects/actions";
import { getPaginatedAndFilteredTimelogsAction } from "@/src/server-actions/timelogs/actions";

interface Props {
	searchParams: SearchParams;
}

export default async function Reports({ searchParams }: Props) {
	const params = await searchParams;
	const currentPageParam = Number(params?.page) || 1;
	const fromDateParam = params?.fromDate || "";
	const toDateParam = params?.toDate || "";
	const clientIdParam = params?.clientId || "";
	const projectIdParam = params?.projectId || "";
	const categoryIdParam = params?.categoryId || "";
	const userIdParam = params?.userId || "";

	const [clients, projects, categories, users] = await Promise.all([
		getAllClientsAction(),
		getAllProjectsAction(),
		getAllTimelogCategoriesAction(),
		getAllUsersAction(),
	]);

	const clientOptions = getClientSelectOptions(clients);
	const projectOptions = getProjectSelectOptions(projects);
	const categoryOptions = getIndustrySelectOptions(categories);
	const userOptions = getUserSelectOptions(users);

	const { timeLogs, totalPages } = await getPaginatedAndFilteredTimelogsAction(
		{
			page: Number(currentPageParam),
			itemsPerPage: ITEMS_PER_PAGE.DEFAULT,
		},
		{
			fromDate: fromDateParam,
			toDate: toDateParam,
			clientId: clientIdParam,
			projectId: projectIdParam,
			categoryId: categoryIdParam,
			userId: userIdParam,
		},
	);

	const rowsData = timeLogs.map(mapDataToRows);

	// TO-DO: Suspense for filters
	return (
		<>
			<Header setting={APP_ROUTES.REPORTS}>
				{/* // TO-DO: Suspense */}
				<ReportFilters
					clientOptions={clientOptions}
					projectOptions={projectOptions}
					categoryOptions={categoryOptions}
					userOptions={userOptions}
				/>
			</Header>

			{/* // TO-DO: Suspense? */}
			<ReportsTable
				rows={rowsData}
				currentPage={currentPageParam}
				totalPages={totalPages}
			/>
		</>
	);
}

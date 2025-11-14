import LetterFilters from "@/src/components/Filters/LetterFilters";
import Header from "@/src/components/Header/Header";
import { List as ProjectsList } from "@/src/components/List/List";
import { APP_ROUTES, INITIAL_LIST_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import {
	getPaginatedAndFilteredProjectsAction,
	getProjectsFirstLettersAction,
} from "@/src/server-actions/projects/actions";

interface Props {
	searchParams: SearchParams;
}

export default async function Projects({ searchParams }: Props) {
	const params = await searchParams;
	const searchInputParam = params?.search || "";
	const letterFilterParam = params?.startsWith || "";
	const currentPageParam = Number(params?.page) || INITIAL_LIST_PAGE;

	const { projects, totalPages } = await getPaginatedAndFilteredProjectsAction(
		currentPageParam,
		searchInputParam,
		letterFilterParam,
	);

	const filterData = await getProjectsFirstLettersAction();

	return (
		<div className="flex flex-col gap-4">
			<Header setting={APP_ROUTES.PROJECTS} />
			<LetterFilters letters={filterData} />
			<ProjectsList
				data={projects}
				currentPage={currentPageParam}
				totalPages={totalPages}
			/>
		</div>
	);
}

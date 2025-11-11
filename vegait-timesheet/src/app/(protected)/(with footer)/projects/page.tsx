import LetterFilters from "@/src/components/Filters/LetterFilters";
import Header from "@/src/components/Header/Header";
import { List as ProjectsList } from "@/src/components/List/List";
import { APP_ROUTES, INITIAL_LIST_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import { projectsParametersSchema } from "@/src/lib/validators/zodSchemas";
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
	const currentPageParam = params?.page || INITIAL_LIST_PAGE;

	const validatedParameters = projectsParametersSchema.parseAsync({
		searchInput: searchInputParam,
		letterFilter: letterFilterParam,
		currentPage: currentPageParam,
	});

	const { searchInput, letterFilter, currentPage } = await validatedParameters;

	const { projects, totalPages } = await getPaginatedAndFilteredProjectsAction(
		currentPage,
		searchInput,
		letterFilter,
	);

	const filterData = await getProjectsFirstLettersAction();

	return (
		<div className="flex flex-col gap-4">
			<Header setting={APP_ROUTES.PROJECTS} />
			<LetterFilters letters={filterData} />
			{/* TO-DO: ADD PLACEHOLDER FOR LIST? (check: suspension?) UNTIL REQUEST FINISHES */}
			<ProjectsList
				data={projects}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
}

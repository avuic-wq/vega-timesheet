import { List } from "@/src/components/Shared/List/List";
import { ITEMS_PER_PAGE } from "@/src/lib/consts";
import { getPaginatedAndFilteredProjectsAction } from "@/src/server-actions/projects/actions";

interface Props {
	currentPage: number;
	searchInput: string;
	letterFilter: string;
}

export async function ProjectList({
	currentPage,
	searchInput,
	letterFilter,
}: Props) {
	// Artifical delay for list
	// await new Promise((resolve) => setTimeout(resolve, 3000));

	const { projects, totalPages } = await getPaginatedAndFilteredProjectsAction(
		{ page: currentPage, itemsPerPage: ITEMS_PER_PAGE.DEFAULT },
		searchInput,
		letterFilter,
	);

	return (
		<List items={projects} currentPage={currentPage} totalPages={totalPages} />
	);
}

export default ProjectList;

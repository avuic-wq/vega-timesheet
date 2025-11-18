import { Suspense } from "react";
import LetterFilters from "@/src/components/Filters/LetterFilters";
import Header from "@/src/components/Header/Header";
import ProjectList from "@/src/components/ProjectList/ProjectList";
import { ListSkeleton } from "@/src/components/Skeletons/ListSkeleton";
import { APP_ROUTES, INITIAL_LIST_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import { getProjectsFirstLettersAction } from "@/src/server-actions/projects/actions";

interface Props {
	searchParams: SearchParams;
}

export default async function Projects({ searchParams }: Props) {
	const params = await searchParams;
	const searchInputParam = params?.search || "";
	const letterFilterParam = params?.startsWith || "";
	const currentPageParam = Number(params?.page) || INITIAL_LIST_PAGE;

	const filterData = await getProjectsFirstLettersAction();

	return (
		<div className="flex flex-col gap-4">
			<Header setting={APP_ROUTES.PROJECTS} />
			<LetterFilters letters={filterData} />
			<Suspense fallback={<ListSkeleton />}>
				<ProjectList
					currentPage={currentPageParam}
					searchInput={searchInputParam}
					letterFilter={letterFilterParam}
				/>
			</Suspense>
		</div>
	);
}

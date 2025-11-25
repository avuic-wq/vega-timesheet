import { Suspense } from "react";
import ClientList from "@/src/components/Clients/ClientList/ClientList";
import Header from "@/src/components/Shared/Header/Header";
import LetterFilters from "@/src/components/Shared/LetterFilters/LetterFilters";
import { ListSkeleton } from "@/src/components/Shared/Skeletons/ListSkeleton";
import { APP_ROUTES, INITIAL_LIST_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import { getClientsFirstLettersAction } from "@/src/server-actions/clients/actions";

interface Props {
	searchParams: SearchParams;
}

export default async function Clients({ searchParams }: Props) {
	const params = await searchParams;
	const searchInputParam = params?.search || "";
	const letterFilterParam = params?.startsWith || "";
	const currentPageParam = Number(params?.page) || INITIAL_LIST_PAGE;

	const filterData = await getClientsFirstLettersAction();

	return (
		<>
			<Header setting={APP_ROUTES.CLIENTS} />
			<LetterFilters letters={filterData} />

			<Suspense fallback={<ListSkeleton />}>
				<ClientList
					currentPage={currentPageParam}
					searchInput={searchInputParam}
					letterFilter={letterFilterParam}
				/>
			</Suspense>
		</>
	);
}

import LetterFilters from "@/src/components/Filters/LetterFilters";
import { List as ClientList } from "@/src/components/List/List";
import { INITIAL_LIST_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import { clientsParametersSchema } from "@/src/lib/validators/zodSchemas";
import {
	getClientFirstLettersAction,
	getPaginatedAndFileterdClientsAction,
} from "@/src/server-actions/clientsActions";

interface Props {
	searchParams: SearchParams;
}

export default async function Clients({ searchParams }: Props) {
	const params = await searchParams;
	const searchInputParam = params?.search || "";
	const letterFilterParam = params?.letterFilter || "";
	const currentPageParam = params?.page || INITIAL_LIST_PAGE; // CHECK: Number(params?.page) or not neccessary?

	const validatedParameters = clientsParametersSchema.parseAsync({
		searchInput: searchInputParam,
		letterFilter: letterFilterParam,
		currentPage: currentPageParam,
	});

	const { searchInput, letterFilter, currentPage } = await validatedParameters;

	const { clients, totalPages } = await getPaginatedAndFileterdClientsAction(
		currentPage,
		searchInput,
		letterFilter,
	);

	const filterData = await getClientFirstLettersAction();

	return (
		<div className="flex flex-col gap-4">
			<LetterFilters letters={filterData} />
			{/* TO-DO: ADD PLACEHOLDER FOR LIST? (check: suspension?) UNTIL REQUEST FINISHES */}
			<ClientList
				data={clients}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
}

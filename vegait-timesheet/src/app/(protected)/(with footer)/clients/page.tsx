import LetterFilters from "@/src/components/Filters/LetterFilters";
import Header from "@/src/components/Header/Header";
import { List as ClientList } from "@/src/components/List/List";
import { APP_ROUTES, INITIAL_LIST_PAGE } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";
import { clientsParametersSchema } from "@/src/lib/validators/zodSchemas";
import {
	getClientsFirstLettersAction,
	getPaginatedAndFileterdClientsAction,
} from "@/src/server-actions/clients/actions";

interface Props {
	searchParams: SearchParams;
}

export default async function Clients({ searchParams }: Props) {
	const params = await searchParams;
	const searchInputParam = params?.search || "";
	const letterFilterParam = params?.startsWith || "";
	const currentPageParam = params?.page || INITIAL_LIST_PAGE;

	const validatedParameters = clientsParametersSchema.parseAsync({
		searchInput: searchInputParam,
		letterFilter: letterFilterParam,
		currentPage: currentPageParam,
	});

	const { searchInput, letterFilter, currentPage } = await validatedParameters;

	const [{ clients, totalPages }, filterData] = await Promise.all([
		getPaginatedAndFileterdClientsAction(
			currentPage,
			searchInput,
			letterFilter,
		),
		getClientsFirstLettersAction(),
	]);

	return (
		<div className="flex flex-col gap-4">
			<Header setting={APP_ROUTES.CLIENTS} />
			<LetterFilters letters={filterData} />
			<ClientList
				data={clients}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
}

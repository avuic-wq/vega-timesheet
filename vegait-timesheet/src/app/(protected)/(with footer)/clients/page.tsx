import LetterFilters from "@/src/components/Filters/LetterFilters";
import { List as ClientList } from "@/src/components/List/List";
import type { SearchParams } from "@/src/lib/types";
import {
	getClientFirstLettersAction,
	getFilteredClientsAction,
} from "@/src/server-actions/clients";

interface Props {
	searchParams: SearchParams;
}

export default async function Clients({ searchParams }: Props) {
	const params = await searchParams;
	const searchInput = params?.search || "";
	const letterFilter = params?.letterFilter || "";
	const clients = await getFilteredClientsAction(searchInput, letterFilter);
	const filterData = await getClientFirstLettersAction();

	return (
		<div className="flex flex-col gap-4">
			<LetterFilters letters={filterData} />
			{/* TO-DO: ADD PLACEHOLDER FOR LIST? (check: suspension?) UNTIL REQUEST FINISHES */}
			<ClientList data={clients} />
		</div>
	);
}

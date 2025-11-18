import { List } from "@/src/components/Shared/List/List";
import { getPaginatedAndFileterdClientsAction } from "@/src/server-actions/clients/actions";

interface Props {
	currentPage: number;
	searchInput: string;
	letterFilter: string;
}

export async function ClientList({
	currentPage,
	searchInput,
	letterFilter,
}: Props) {
	// Artifical delay for list
	// await new Promise((resolve) => setTimeout(resolve, 3000));

	const { clients, totalPages } = await getPaginatedAndFileterdClientsAction(
		currentPage,
		searchInput,
		letterFilter,
	);

	return (
		<List items={clients} currentPage={currentPage} totalPages={totalPages} />
	);
}

export default ClientList;

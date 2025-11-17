import { fetchClientById } from "@/src/app/db/ClientsService/service";
import EditClientForm from "@/src/components/EditClientForm/EditClientForm";
import Modal from "@/src/components/Modal/Modal";
import { getCountrySelectOptions } from "@/src/lib/utils/getCountrySelectOptions";

const modalTitle = "Client";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditClient({ params }: Props) {
	const { id: clientId } = await params;

	const clientData = await fetchClientById(clientId);

	const countryOptions = getCountrySelectOptions();

	return (
		<Modal title={modalTitle}>
			<EditClientForm clientData={clientData} countryOptions={countryOptions} />
		</Modal>
	);
}

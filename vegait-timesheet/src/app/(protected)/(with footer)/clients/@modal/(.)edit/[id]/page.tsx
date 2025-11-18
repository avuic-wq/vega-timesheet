import EditClientForm from "@/src/components/Clients/EditClientForm/EditClientForm";
import Modal from "@/src/components/Modal/Modal";
import { getCountrySelectOptions } from "@/src/lib/utils/getCountrySelectOptions";
import { getClientByIdAction } from "@/src/server-actions/clients/actions";

const modalTitle = "Client";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditClient({ params }: Props) {
	const { id: clientId } = await params;

	const clientData = await getClientByIdAction(clientId);
	const countryOptions = getCountrySelectOptions();

	return (
		<Modal title={modalTitle}>
			<EditClientForm
				clientData={clientData ? clientData : null}
				countryOptions={countryOptions}
			/>
		</Modal>
	);
}

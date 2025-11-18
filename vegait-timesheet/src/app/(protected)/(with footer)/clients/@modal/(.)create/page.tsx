import CreateClientForm from "@/src/components/Clients/CreateClientForm/CreateClientForm";
import Modal from "@/src/components/Shared/Modal/Modal";
import { getCountrySelectOptions } from "@/src/lib/utils/getCountrySelectOptions";

const modalTitle = "Create";

export default async function CreateClient() {
	const countryOptions = getCountrySelectOptions();

	return (
		<Modal title={modalTitle}>
			<CreateClientForm countryOptions={countryOptions} />
		</Modal>
	);
}

import { fetchClientById } from "@/src/app/db/ClientsService/service";
import EditClientForm from "@/src/components/EditClientForm/EditClientForm";
import Modal from "@/src/components/Modal/Modal";
import { countriesData } from "@/src/lib/countriesData";

const modalTitle = "Client";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditClient({ params }: Props) {
	const { id: clientId } = await params;

	const clientData = await fetchClientById(clientId);

	const countryOptions = Object.values(countriesData).map((countryData) => {
		return { label: countryData.name, value: countryData.iso2 };
	});

	const initialCountry = countryOptions.find((option) => {
		return option.value === clientData?.countryCode;
	}) || { label: "", value: "" };

	return (
		<Modal title={modalTitle}>
			<EditClientForm clientData={clientData} countryOptions={countryOptions} />
		</Modal>
	);
}

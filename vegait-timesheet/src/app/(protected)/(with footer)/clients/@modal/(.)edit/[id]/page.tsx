import EditForm from "@/src/components/EditForm/EditForm";
import type { FormConfig } from "@/src/components/EditForm/types";
import Modal from "@/src/components/Modal/Modal";

const modalTitle = "Update client";

interface Props {
	params: { id: string };
}

export default async function UpdateClientModal({ params }: Props) {
	const clientId = params.id;
	// const { countries: allCountries } = fetchAllCountries()
	// const { client } = fetchClientById(clientId)
	// const deleteClient = deleteClientByIdAction(clientId)
	// CHECK IF THE SNYTAX IS OK FOR ABOVE

	// Promise.all[]

	const deleteClient = () => console.log("Deleting client");
	const updateClient = () => console.log("Updating client");

	// TO-DO: Extract
	const formConfig: FormConfig = {
		fields: [
			{ name: "client-name", type: "text", placeholder: "Name", value: "" },
			{
				name: "client-address",
				type: "text",
				placeholder: "Address",
				value: "",
			},
			{
				name: "client-countryISO",
				type: "text",
				placeholder: "Country",
				value: "",
			},
		],
		buttons: [
			{ text: "Save", onClick: updateClient },
			{ text: "Delete", onClick: deleteClient },
		],
	};

	return (
		<Modal title={modalTitle}>
			<EditForm config={formConfig} />
		</Modal>
	);
}

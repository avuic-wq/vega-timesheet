import { fetchClientById } from "@/src/app/db/ClientsService/service";
import EditForm from "@/src/components/EditForm/EditForm";
import type { FormConfig } from "@/src/components/EditForm/types";
import Modal from "@/src/components/Modal/Modal";
import { countriesData } from "@/src/lib/countriesData";

const modalTitle = "Client";

interface Props {
	params: { id: string };
}

export default async function UpdateClientModal({ params }: Props) {
	const { id: clientId } = await params;

	// Promise.all[]
	// const deleteClient = await deleteClientByIdAction(clientId)
	const clientData = await fetchClientById(clientId);

	const countriesOptions = Object.values(countriesData).map((countryData) => {
		return { label: countryData.name, value: countryData.iso3 };
	});

	const initialCountry = countriesOptions.find((option) => {
		return option.value === clientData?.countryCode;
	}) || { label: "", value: "" };

	// TO-DO: Extract
	const formConfig: FormConfig = {
		fields: [
			{
				name: "client-name",
				type: "text",
				placeholder: "Name",
				initialValue: clientData?.name || "",
				isRequired: true,
			},
			{
				name: "client-address",
				type: "text",
				placeholder: "Address",
				initialValue: clientData?.address || "",
				isRequired: true,
			},
			{
				name: "client-countryISO",
				type: "select",
				placeholder: "Country",
				initialValue: initialCountry,
				options: countriesOptions,
				isRequired: true,
			},
		],
		buttons: [
			{
				text: "Save",
				variant: "primary",
				isDisabled: false,
				action: "UPDATE",
			},
			{
				text: "Delete",
				variant: "danger",
				action: "DELETE",
			},
		],
	};

	return (
		<Modal title={modalTitle}>
			<EditForm config={formConfig} />
		</Modal>
	);
}

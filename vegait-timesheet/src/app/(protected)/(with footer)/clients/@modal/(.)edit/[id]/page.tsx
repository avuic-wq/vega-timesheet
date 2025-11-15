import { fetchClientById } from "@/src/app/db/ClientsService/service";
import EditForm from "@/src/components/EditForm/EditForm";
import type { FormConfig } from "@/src/components/EditForm/types";
import Modal from "@/src/components/Modal/Modal";
import { countriesData } from "@/src/lib/countriesData";

const modalTitle = "Client";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function UpdateClientModal({ params }: Props) {
	const { id: clientId } = await params;

	const clientData = await fetchClientById(clientId);

	const countriesOptions = Object.values(countriesData).map((countryData) => {
		return { label: countryData.name, value: countryData.iso2 };
	});

	const initialCountryCode =
		countriesOptions.find((option) => {
			return option.value === clientData?.countryCode;
		})?.value || "";

	// TO-DO: Extract
	const formConfig: FormConfig = {
		entityId: clientId,
		entityType: "clients",
		fields: [
			{
				name: "name",
				type: "text",
				placeholder: "Name",
				initialValue: clientData?.name || "",
				isRequired: true,
			},
			{
				name: "address",
				type: "text",
				placeholder: "Address",
				initialValue: clientData?.address || "",
				isRequired: true,
			},
			{
				name: "countryCode",
				type: "select",
				placeholder: "Country",
				initialValue: initialCountryCode,
				options: countriesOptions,
				isRequired: true,
			},
		],
		buttons: [
			{
				text: "Save",
				variant: "primary",
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

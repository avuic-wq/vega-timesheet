import { fetchClientById } from "@/src/app/db/ClientsService/service";
import EditForm from "@/src/components/EditForm/EditForm";
import type {
	FormButtonAction,
	FormConfig,
	FormState,
} from "@/src/components/EditForm/types";
import Modal from "@/src/components/Modal/Modal";
import { countriesData } from "@/src/lib/countriesData";
import {
	deleteClientAction,
	updateClientAction,
} from "@/src/server-actions/clients/actions";

const modalTitle = "Client";

export const ACTION_TYPES: Record<FormButtonAction, FormButtonAction> = {
	UPDATE: "UPDATE",
	DELETE: "DELETE",
};
interface Props {
	params: Promise<{ id: string }>;
}

export default async function UpdateClientModal({ params }: Props) {
	const { id: clientId } = await params;

	const clientData = await fetchClientById(clientId);

	const countriesOptions = Object.values(countriesData).map((countryData) => {
		return { label: countryData.name, value: countryData.iso3 };
	});

	const initialCountry = countriesOptions.find((option) => {
		return option.value === clientData?.countryCode;
	}) || { label: "", value: "" };

	const handleModalForm = async (
		_prevState: FormState,
		formData: FormData,
	): Promise<FormState> => {
		"use server";

		const actionType = formData.get("action");

		if (actionType === ACTION_TYPES.UPDATE) {
			return await updateClientAction(clientId, formData);
		}

		if (actionType === ACTION_TYPES.DELETE) {
			return await deleteClientAction(clientId);
		}
	};

	// TO-DO: Extract
	const formConfig: FormConfig = {
		formAction: handleModalForm,
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

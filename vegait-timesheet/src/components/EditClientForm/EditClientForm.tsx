"use client";

import type { Client } from "@prisma/client";
import FormController from "@/src/components/Form/FormController";
import type { ClientFormData, SelectOption } from "@/src/components/Form/types";
import { clientConfigFactory } from "@/src/lib/Factory/clientConfigFactory";
import { formActionsFactory } from "@/src/lib/Factory/formActionsFactory";

interface Props<T> {
	clientData: Client;
	countryOptions: SelectOption[];
	initialValues?: T;
}

const EditClientForm = <T,>({ clientData, countryOptions }: Props<T>) => {
	const formConfig = clientConfigFactory({
		mode: "edit",
		countryOptions,
	});

	const formActions = formActionsFactory({
		mode: "edit",
		entityType: "client",
		entityId: clientData.id,
	});

	const initialValues: ClientFormData = {
		name: clientData.name || "",
		address: clientData.address || "",
		countryCode: clientData.countryCode || "",
	};

	return (
		<FormController
			mode="edit"
			config={formConfig}
			actions={formActions}
			initialValues={initialValues}
		/>
	);
};

export default EditClientForm;

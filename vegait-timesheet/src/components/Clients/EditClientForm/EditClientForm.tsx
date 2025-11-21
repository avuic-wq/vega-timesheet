"use client";

import type { Client } from "@prisma/client";
import FormController from "@/src/components/Shared/Form/FormController";
import type {
	ClientFormData,
	SelectOption,
} from "@/src/components/Shared/Form/types";
import { clientFormConfigFactory } from "@/src/lib/Factory/EntityForm/clientFormConfigFactory";
import { entityFormActionsFactory } from "@/src/lib/Factory/EntityForm/entityFormActionsFactory";

interface Props<T> {
	clientData: Client | null;
	countryOptions: SelectOption[];
	initialValues?: T;
}

const EditClientForm = <T,>({ clientData, countryOptions }: Props<T>) => {
	const formConfig = clientFormConfigFactory({
		mode: "edit",
		countryOptions,
	});

	const formActions = entityFormActionsFactory({
		mode: "edit",
		entityType: "client",
		entityId: clientData?.id,
	});

	const initialValues: ClientFormData = {
		name: clientData?.name || "",
		address: clientData?.address || "",
		countryCode: clientData?.countryCode || "",
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

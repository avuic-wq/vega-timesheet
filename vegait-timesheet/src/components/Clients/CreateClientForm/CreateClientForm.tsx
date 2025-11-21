"use client";

import FormController from "@/src/components/Shared/Form/FormController";
import type {
	ClientFormData,
	SelectOption,
} from "@/src/components/Shared/Form/types";
import { clientFormConfigFactory } from "@/src/lib/Factory/EntityForm/clientFormConfigFactory";
import { entityFormActionsFactory } from "@/src/lib/Factory/EntityForm/entityFormActionsFactory";

interface Props<T> {
	countryOptions: SelectOption[];
}

const CreateClientForm = <T,>({ countryOptions }: Props<T>) => {
	const formConfig = clientFormConfigFactory({
		mode: "create",
		countryOptions,
	});

	const formActions = entityFormActionsFactory({
		mode: "create",
		entityType: "client",
	});

	const initialValues: ClientFormData = {
		name: "",
		address: "",
		countryCode: "",
	};

	return (
		<FormController
			mode="create"
			config={formConfig}
			actions={formActions}
			initialValues={initialValues}
		/>
	);
};

export default CreateClientForm;

"use client";

import FormController from "@/src/components/Shared/Form/FormController";
import type {
	ProjectFormData,
	SelectOption,
} from "@/src/components/Shared/Form/types";
import { formActionsFactory } from "@/src/lib/Factory/formActionsFactory";
import { projectFormConfigFactory } from "@/src/lib/Factory/projectFormConfigFactory";

interface Props {
	clientOptions: SelectOption[];
	industryOptions: SelectOption[];
}

const CreateProjectForm = ({ clientOptions, industryOptions }: Props) => {
	const formConfig = projectFormConfigFactory({
		mode: "create",
		clientOptions,
		industryOptions,
	});

	const formActions = formActionsFactory({
		mode: "create",
		entityType: "project",
	});

	const initialValues: ProjectFormData = {
		name: "",
		clientId: "",
		industryId: "",
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

export default CreateProjectForm;

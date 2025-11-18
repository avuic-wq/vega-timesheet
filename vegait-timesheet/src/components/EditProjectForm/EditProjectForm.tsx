"use client";

import type { Project } from "@prisma/client";
import FormController from "@/src/components/Form/FormController";
import type {
	ProjectFormData,
	SelectOption,
} from "@/src/components/Form/types";
import { formActionsFactory } from "@/src/lib/Factory/formActionsFactory";
import { projectFormConfigFactory } from "@/src/lib/Factory/projectFormConfigFactory";

interface Props {
	projectData: Project;
	clientOptions: SelectOption[];
	industryOptions: SelectOption[];
}

const EditProjectForm = ({
	projectData,
	clientOptions,
	industryOptions,
}: Props) => {
	const formConfig = projectFormConfigFactory({
		mode: "edit",
		clientOptions,
		industryOptions,
	});

	const actions = formActionsFactory({
		mode: "edit",
		entityType: "project",
		entityId: projectData.id,
	});

	const initialValues: ProjectFormData = {
		name: projectData.name,
		clientId: projectData.clientId,
		industryId: projectData.industryId,
	};

	return (
		<FormController
			mode="edit"
			config={formConfig}
			actions={actions}
			initialValues={initialValues}
		/>
	);
};

export default EditProjectForm;

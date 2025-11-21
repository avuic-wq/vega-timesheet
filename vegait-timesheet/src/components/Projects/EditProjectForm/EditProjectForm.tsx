"use client";

import type { Project } from "@prisma/client";
import FormController from "@/src/components/Shared/Form/FormController";
import type {
	ProjectFormData,
	SelectOption,
} from "@/src/components/Shared/Form/types";
import { entityFormActionsFactory } from "@/src/lib/Factory/EntityForm/entityFormActionsFactory";
import { projectFormConfigFactory } from "@/src/lib/Factory/EntityForm/projectFormConfigFactory";

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

	const actions = entityFormActionsFactory({
		mode: "edit",
		entityType: "project",
		entityId: projectData.id,
	});

	const initialValues: ProjectFormData = {
		name: projectData.name || "",
		clientId: projectData.clientId || "",
		industryId: projectData.industryId || "",
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

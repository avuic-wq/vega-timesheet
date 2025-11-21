import EditProjectForm from "@/src/components/Projects/EditProjectForm/EditProjectForm";
import Modal from "@/src/components/Shared/Modal/Modal";
import { getClientSelectOptions } from "@/src/lib/utils/getClientSelectOptions";
import { getIndustrySelectOptions } from "@/src/lib/utils/getIndustrySelectOptions";
import { getAllClientsAction } from "@/src/server-actions/clients/actions";
import { getAllIndustriesAction } from "@/src/server-actions/industries/actions";
import { getProjectByIdAction } from "@/src/server-actions/projects/actions";

const modalTitle = "Edit";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditProject({ params }: Props) {
	const { id: projectId } = await params;

	const [projectData, clients, industries] = await Promise.all([
		getProjectByIdAction(projectId),
		getAllClientsAction(),
		getAllIndustriesAction(),
	]);

	const clientSelectOptions = getClientSelectOptions(clients);
	const industrySelectOptions = getIndustrySelectOptions(industries);

	return (
		<Modal title={modalTitle}>
			<EditProjectForm
				projectData={projectData}
				clientOptions={clientSelectOptions}
				industryOptions={industrySelectOptions}
			/>
		</Modal>
	);
}

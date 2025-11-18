import CreateProjectForm from "@/src/components/Projects/CreateProjectForm/CreateProjectForm";
import Modal from "@/src/components/Shared/Modal/Modal";
import { getClientSelectOptions } from "@/src/lib/utils/getClientSelectOptions";
import { getIndustrySelectOptions } from "@/src/lib/utils/getIndustrySelectOptions";
import { getAllClientsAction } from "@/src/server-actions/clients/actions";
import { getAllIndustriesAction } from "@/src/server-actions/industries/actions";

const modalTitle = "Create";

export default async function CreateProject() {
	const [clients, industries] = await Promise.all([
		getAllClientsAction(),
		getAllIndustriesAction(),
	]);

	const clientSelectOptions = getClientSelectOptions(clients);
	const industrySelectOptions = getIndustrySelectOptions(industries);

	return (
		<Modal title={modalTitle}>
			<CreateProjectForm
				clientOptions={clientSelectOptions}
				industryOptions={industrySelectOptions}
			/>
		</Modal>
	);
}

import Modal from "@/src/components/Modal/Modal";

const modalTitle = "Create";

export default async function CreateProject() {
	// const clientOptions = getClientSelectOptions()
	// const industryOptions = getIndustrySelectOptions()

	return (
		<Modal title={modalTitle}>
			<CreateProjectForm clientOptions={clientOptions} industryOptions={industryOptions} />
		</Modal>
	);
}

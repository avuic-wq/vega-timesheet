import Modal from "@/src/components/Modal/Modal";

const modalTitle = "Project";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function EditProject({ params }: Props) {
	const { id: projectId } = await params;

	const projectData = await fetchProjectById(projectId);
	const clientOptions = getClientSelectOptions();
	const industryOptions = getIndustrySelectOptions();

	return (
		<Modal title={modalTitle}>
			<EditProjectForm projectData={projectData} industryOptions={industryOptions} />
		</Modal>
	);
}

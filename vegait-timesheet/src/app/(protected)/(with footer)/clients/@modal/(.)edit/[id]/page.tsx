import EditForm from "@/src/components/EditForm/EditForm";
import Modal from "@/src/components/Modal/Modal";

const modalTitle = "Update client";

export default async function UpdateClientModal() {
	return (
		<Modal title={modalTitle}>
			<EditForm />
		</Modal>
	);
}

import Modal from "@/src/components/Modal/Modal";
import { APP_ROUTES } from "@/src/lib/consts";

export default async function UpdateClientModal() {
	return (
		<Modal returnUrl={APP_ROUTES.CLIENTS}>
			<h2>Update existing Client</h2>
		</Modal>
	);
}

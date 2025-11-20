"use client";

import { useRouter } from "next/navigation";
import Button from "@/src/components/Shared/Button/Button";
import Form from "@/src/components/Shared/Form/Form";
import type {
	BaseFormData,
	EntityFormActions,
	EntityFormMode,
	FormConfig,
} from "@/src/components/Shared/Form/types";

interface Props<T> {
	mode: EntityFormMode;
	config: FormConfig;
	actions: EntityFormActions<T>;
	initialValues: T;
}

const FormController = <T extends BaseFormData>({
	mode,
	config,
	actions,
	initialValues,
}: Props<T>) => {
	const router = useRouter();

	const handleOnSubmit = async (data: T) => {
		const result = await actions.onSubmit(data);

		if (result?.isSuccessful) {
			router.back();
		}
	};

	const handleOnDelete = async () => {
		if (!actions?.onDelete) return;

		const result = await actions.onDelete();

		if (result?.isSuccessful) {
			router.back();
		}
	};

	return (
		<div>
			<Form
				config={config}
				onSubmit={handleOnSubmit}
				initialValues={initialValues}
				hasResetButton={mode === "create"}
			/>
			{mode === "edit" && actions?.onDelete && (
				<Button onClick={handleOnDelete} variant="danger" className="w-2/5">
					{config.buttonText.delete}
				</Button>
			)}
		</div>
	);
};

export default FormController;

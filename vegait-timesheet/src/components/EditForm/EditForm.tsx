"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import Button from "@/src/components/Button/Button";
import FormFields from "./FormFields";
import type { FormButtonAction, FormConfig, FormValues } from "./types";
import { getFormInitialValues, submitHandlerMapper } from "./utils";

interface Props {
	config: FormConfig;
}

const EditForm = ({ config }: Props) => {
	const router = useRouter();
	const initialValues = getFormInitialValues(config);
	const [formValues, setFormValues] = useState<FormValues>(initialValues);

	const handleSubmitForm = async (
		e: FormEvent,
		entityId: FormConfig["entityId"],
		entityType: FormConfig["entityType"],
	): Promise<void> => {
		e.preventDefault();

		const submitter = (e.nativeEvent as SubmitEvent)
			.submitter as HTMLButtonElement;
		const actionType = submitter?.value as FormButtonAction;

		const result = await submitHandlerMapper[entityType][actionType](
			entityId,
			formValues,
		);
		console.log({ result }); // Save doesnt work due to getting object instead of string value for coutnry code
		if (result?.isRequestSuccessful) {
			router.back();
		}
	};

	const handleFormValuesChange = (values: FormValues) => {
		setFormValues(values);
	};

	return (
		<div className="flex flex-col justify-center gap-4 mb-3">
			<form
				onSubmit={(e) =>
					handleSubmitForm(e, config.entityId, config.entityType)
				}
				className="flex flex-col gap-4 w-full mb-4"
			>
				<FormFields
					config={config}
					formValues={formValues}
					onFormValuesChange={handleFormValuesChange}
				/>

				<div className="flex justify-center flex-col items-center gap-3">
					{config.buttons.map((button) => {
						return (
							<Button
								key={button.text}
								type="submit"
								variant={button.variant}
								formActionName={button.action}
								className="w-2/5"
							>
								{button.text}
							</Button>
						);
					})}
				</div>
			</form>
		</div>
	);
};

export default EditForm;

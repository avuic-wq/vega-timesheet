"use client";

import { useCallback, useState } from "react";
import Button from "@/src/components/Shared/Button/Button";
import FormField from "@/src/components/Shared/Form/FormField";
import Text from "@/src/components/Shared/Text/Text";
import type { BaseFormData, FieldValue, FormConfig } from "../Form/types";

type Props<T> = {
	config: FormConfig;
	onSubmit: (data: T) => Promise<void>;
	initialValues: T;
	hasResetButton?: boolean;
};

const Form = <T extends BaseFormData>({
	config,
	onSubmit,
	initialValues,
	hasResetButton = false,
}: Props<T>) => {
	const [formValues, setFormValues] = useState<T>(initialValues || ({} as T));

	const handleValuesChange = (fieldName: string, value: FieldValue) => {
		setFormValues((prev) => {
			return {
				...prev,
				[fieldName]: value,
			};
		});
	};

	const handleSubmit = useCallback(() => {
		if (!formValues) return;
		onSubmit(formValues);
	}, [formValues, onSubmit]);

	const handleReset = useCallback(() => {
		setFormValues(initialValues || ({} as T));
	}, [initialValues]);

	return (
		<div className="flex flex-col justify-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				className="flex flex-col gap-4 w-full mb-4"
			>
				{config?.fields?.map((field) => {
					return (
						<div key={field.name} className="flex justify-between">
							<div className="w-full">
								{
									<FormField
										field={field}
										formValues={formValues}
										onChange={handleValuesChange}
									/>
								}
							</div>
							<div className="min-w-3">
								{field.isRequired && (
									<Text value="*" className="ml-1 font-bold text-red" />
								)}
							</div>
						</div>
					);
				})}
				<div className="flex justify-center flex-col items-center gap-2">
					<Button
						key={config.buttonText.submit}
						type="submit"
						variant="primary"
						className="w-2/5"
					>
						{config.buttonText.submit}
					</Button>

					{hasResetButton && (
						<Button
							key="reset"
							type="submit"
							variant="secondary"
							onClick={handleReset}
							className="w-2/5"
						>
							<Text value="Reset" />
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Form;

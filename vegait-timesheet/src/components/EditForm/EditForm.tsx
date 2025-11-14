"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import Button from "@/src/components/Button/Button";
import FormField from "@/src/components/EditForm/FormField";
import Text from "@/src/components/Text";
import type { FormConfig } from "./types";

type Props = {
	config: FormConfig;
};

const EditForm = ({ config }: Props) => {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		config?.formAction,
		undefined,
	);

	useEffect(() => {
		if (state?.isRequestSuccessful) {
			router.back();
		}
	}, [state?.isRequestSuccessful, router]);

	return (
		<div className="flex flex-col justify-center gap-4 mb-3">
			<form action={formAction} className="flex flex-col gap-4 w-full mb-4">
				{config?.fields?.map((field) => {
					return (
						<div key={field.name} className="flex justify-between">
							<div className="w-full">{<FormField field={field} />}</div>
							<div className="min-w-3">
								{field.isRequired && (
									<Text value="*" className="ml-1 font-bold text-red" />
								)}
							</div>
						</div>
					);
				})}
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

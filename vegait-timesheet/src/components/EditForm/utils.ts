import {
	deleteClientAction,
	updateClientAction,
} from "@/src/server-actions/clients/actions";
import {
	deleteProjectAction,
	updateProjectAction,
} from "@/src/server-actions/projects/actions";
import type { FormConfig, FormValues, SubmitHandlerMapper } from "./types";

export const getFormInitialValues = (config: FormConfig): FormValues => {
	const fields = config.fields || [];

	return fields.reduce((acc, curr) => {
		if (!curr.initialValue) {
			return {
				...acc,
				[curr.name]: undefined,
			};
		}
		return {
			...acc,
			[curr.name]: curr.initialValue,
		};
	}, {});
};

export const submitHandlerMapper: SubmitHandlerMapper = {
	clients: {
		UPDATE: (entityId: FormConfig["entityId"], formValues: FormValues) =>
			updateClientAction(entityId, formValues),
		DELETE: (entityId: FormConfig["entityId"]) => deleteClientAction(entityId),
	},
	projects: {
		UPDATE: (entityId: FormConfig["entityId"], formValues?: FormValues) =>
			updateProjectAction(entityId, formValues),
		DELETE: (entityId: FormConfig["entityId"]) => deleteProjectAction(entityId),
	},
};

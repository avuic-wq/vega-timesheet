import type { Client, Project } from "@prisma/client";
import type { ButtonVariant } from "@/src/lib/types";

export type TextField = {
	type: "text";
	name: string;
	placeholder: string;
	initialValue?: string;
	isRequired?: boolean;
};

export type SelectableOption = { label: string; value: string };

export type SelectField = {
	type: "select";
	name: string;
	placeholder: string;
	initialValue?: string;
	options: SelectableOption[];
	isRequired?: boolean;
};

export type FormButtonAction = "UPDATE" | "DELETE";

export type FormField = TextField | SelectField;
export type Button = {
	text: string;
	variant: ButtonVariant;
	action: FormButtonAction;
};

export type FormState =
	| {
			isRequestSuccessful?: boolean;
			data?: Client | Project;
			errors?: Record<string, string | null | undefined>;
	  }
	| undefined;

export type FormConfig = {
	entityId: string;
	entityType: "clients" | "projects";
	fields: FormField[];
	buttons: Button[];
};

export type FormValues = Record<string, string>;

export type SubmitHandlerMapper = Record<
	FormConfig["entityType"],
	Record<FormButtonAction, (entityId: string, formValues: FormValues) => any> // TO-DO: Update to action return types
>;

import type { ButtonVariant } from "@/src/lib/types";

export type TextField = {
	type: "text";
	name: string;
	placeholder: string;
	initialValue: string;
	isRequired?: boolean;
};

export type SelectableOption = { label: string; value: string };

export type SelectField = {
	type: "select";
	name: string;
	placeholder: string;
	initialValue: SelectableOption;
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
	| { isRequestSuccessful?: boolean; errors?: Record<string, string> }
	| undefined;
export type FormConfig = {
	formAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
	fields: FormField[];
	buttons: Button[];
};

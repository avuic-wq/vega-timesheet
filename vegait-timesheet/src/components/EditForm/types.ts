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

export type FormField = TextField | SelectField;
export type Button = {
	text: string;
	variant: ButtonVariant;
	action: "UPDATE" | "DELETE";
	isDisabled?: boolean;
};

export type FormConfig = {
	fields: FormField[];
	buttons: Button[];
};

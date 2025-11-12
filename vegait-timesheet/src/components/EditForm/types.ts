import type { ButtonVariant } from "@/src/lib/types";

export type TextField = {
	type: "text";
	name: string;
	placeholder: string;
	value: string;
	isRequired?: boolean;
};

export type DropdownField = {
	type: "dropdown";
	name: string;
	placeholder: string;
	value: string;
	options: { label: string; value: string }[];
	isRequired?: boolean;
};

export type FormField = TextField | DropdownField;
export type Button = {
	text: string;
	variant: ButtonVariant;
	onClick: () => void;
	isDisabled?: boolean;
};

export type FormConfig = {
	fields: FormField[];
	buttons: Button[];
};

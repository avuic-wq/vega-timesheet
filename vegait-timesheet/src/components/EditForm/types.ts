import type { ButtonVariant } from "@/src/lib/types";

export type TextField = {
	type: "text";
	name: string;
	placeholder: string;
	value: string;
};

export type DropdownField = {
	type: "dropdown";
	name: string;
	placeholder: string;
	value: string;
	options: { label: string; value: string }[];
};

export type FormField = TextField | DropdownField;
export type Button = {
	text: string;
	variant: ButtonVariant;
	onClick: () => void;
};

export type FormConfig = {
	fields: FormField[];
	buttons: Button[];
};

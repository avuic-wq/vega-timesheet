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
export type Button = { text: string; onClick: () => void };

export type FormConfig = {
	fields: FormField[];
	buttons: Button[];
};

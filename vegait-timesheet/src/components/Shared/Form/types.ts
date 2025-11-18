interface BaseField {
	name: string;
	isRequired?: boolean;
	placeholder?: string;
}
export interface TextField extends BaseField {
	type: "text" | "password";
}
export interface SelectField extends BaseField {
	type: "select";
	options: SelectOption[];
}
export type SelectOption = { value: string; label: string };

export type FormField = TextField | SelectField;

export type FieldValue = string;

export interface BaseFormData {
	[key: string]: FieldValue;
}

export interface ClientFormData extends BaseFormData {
	address: string;
	countryCode: string;
}

export interface ProjectFormData extends BaseFormData {
	clientId: string;
	industryId: string;
}

export interface LoginFormData extends BaseFormData {
	username: string;
	password: string;
}

export interface FormConfig {
	fields: FormField[];
	buttonText: {
		submit: string;
		delete?: string;
	};
}

export interface FormActions<T> {
	onSubmit: (data: T) => Promise<FormState<T>>;
	onDelete?: () => Promise<FormState<T>>;
}

export type EntityDataMap = {
	client: ClientFormData;
	project: ProjectFormData;
};

export type EntityType = "client" | "project";
export type FormMode = "create" | "edit";

export type FormState<T> = {
	isSuccessful?: boolean;
	errors?: Record<string, string>;
	data?: T;
};

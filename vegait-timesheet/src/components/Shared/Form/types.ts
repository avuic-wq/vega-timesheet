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

export interface DateField extends BaseField {
	type: "date";
}

export type SelectOption = { value: string; label: string };

export type FormField = TextField | SelectField | DateField;

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

export interface RegisterFormData extends BaseFormData {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface FormConfig {
	fields: FormField[];
	buttonText: {
		submit: string;
		delete?: string;
	};
}

export interface EntityFormActions<T> {
	onSubmit: (data: T) => Promise<QueryState<T>>;
	onDelete?: () => Promise<QueryState<T>>;
}

export interface AuthFormActions<T> {
	onSubmit: (data: T) => Promise<QueryState<T>>;
}

export type EntityFormDataMap = {
	client: ClientFormData;
	project: ProjectFormData;
};

export type AuthFormDataMap = {
	login: LoginFormData;
	register: RegisterFormData;
};

export type EntityType = "client" | "project";
export type EntityFormMode = "create" | "edit";
export type AuthFormMode = "login" | "register";

export type QueryState<T> = {
	isSuccessful?: boolean;
	errors?: Record<string, string>;
	data?: T;
};

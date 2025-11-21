import type {
	AuthFormMode,
	FormConfig,
	FormField,
} from "@/src/components/Shared/Form/types";

interface Props {
	mode: AuthFormMode;
}

const fieldsMap: Record<AuthFormMode, FormField[]> = {
	login: [
		{
			type: "text",
			name: "username",
			placeholder: "Username",
			isRequired: true,
		},
		{
			type: "password",
			name: "password",
			placeholder: "Password",
			isRequired: true,
		},
	],
	register: [
		{
			type: "text",
			name: "username",
			placeholder: "Username",
			isRequired: true,
		},
		{
			type: "password",
			name: "password",
			placeholder: "Password",
			isRequired: true,
		},
		{
			type: "text",
			name: "firstName",
			placeholder: "First name",
			isRequired: true,
		},
		{
			type: "text",
			name: "lastName",
			placeholder: "Last name",
			isRequired: true,
		},
	],
};

export const authFormConfigFactory = ({ mode }: Props): FormConfig => ({
	fields: fieldsMap[mode],
	buttonText: {
		submit: mode === "login" ? "Login" : "Register",
	},
});

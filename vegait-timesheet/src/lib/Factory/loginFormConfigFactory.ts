import type { FormConfig } from "@/src/components/Form/types";

export const loginFormConfigFactory = (): FormConfig => ({
	fields: [
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
	buttonText: {
		submit: "Login",
	},
});

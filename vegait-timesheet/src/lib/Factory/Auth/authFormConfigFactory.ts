import type {
	AuthFormMode,
	FormConfig,
} from "@/src/components/Shared/Form/types";

interface Props {
	mode: AuthFormMode;
}
export const authFormConfigFactory = ({ mode }: Props): FormConfig => ({
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
		submit: mode === "login" ? "Login" : "Register",
	},
});

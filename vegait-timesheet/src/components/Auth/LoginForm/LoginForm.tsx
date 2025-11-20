"use client";

import Form from "@/src/components/Shared/Form/Form";
import type { LoginFormData } from "@/src/components/Shared/Form/types";
import { loginFormConfigFactory } from "@/src/lib/Factory/loginFormConfigFactory";
import { loginAction } from "@/src/server-actions/auth/actions";

interface Props {
	callbackUrl?: string;
}

const LoginForm = ({ callbackUrl }: Props) => {
	const formConfig = loginFormConfigFactory();

	const handleOnSubmit = async (formValues: LoginFormData) => {
		await loginAction(formValues, callbackUrl);
	};

	const initialValues: LoginFormData = {
		username: "",
		password: "",
	};

	return (
		<Form
			config={formConfig}
			onSubmit={handleOnSubmit}
			initialValues={initialValues}
			isLoginForm
		/>
	);
};

export default LoginForm;

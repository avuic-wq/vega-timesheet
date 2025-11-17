"use client";

import Form from "@/src/components/Form/Form";
import type { LoginFormData } from "@/src/components/Form/types";
import { loginFormConfigFactory } from "@/src/lib/Factory/loginFormConfigFactory";
import { loginAction } from "@/src/server-actions/auth/actions";

interface Props {
	callbackUrl?: string;
}

const LoginForm = ({ callbackUrl }: Props) => {
	const formConfig = loginFormConfigFactory();

	const handleOnSubmit = async (formValues: LoginFormData) => {
		console.log("submit", { callbackUrl });
		await loginAction(formValues, callbackUrl);
	};

	return <Form config={formConfig} onSubmit={handleOnSubmit} />;
};

export default LoginForm;

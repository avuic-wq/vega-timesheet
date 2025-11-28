"use client";

import Link from "next/link";
import Button from "@/src/components/Shared/Button/Button";
import Form from "@/src/components/Shared/Form/Form";
import type { LoginFormData } from "@/src/components/Shared/Form/types";
import Text from "@/src/components/Shared/Text/Text";
import { APP_ROUTES } from "@/src/lib/consts";
import { authFormConfigFactory } from "@/src/lib/Factory/AuthForm/authFormConfigFactory";
import { loginAction } from "@/src/server-actions/auth/actions";
import { signIn } from "next-auth/react";

interface Props {
	callbackUrl?: string;
}

const LoginForm = ({ callbackUrl }: Props) => {
	const formConfig = authFormConfigFactory({ mode: "login" });

	const handleOnSubmit = async (formValues: LoginFormData) => {
		await loginAction(formValues, callbackUrl);
	};

	const initialValues: LoginFormData = {
		username: "",
		password: "",
	};

	return (
		<div>
			<Form
				config={formConfig}
				onSubmit={handleOnSubmit}
				initialValues={initialValues}
			/>
			<div className="flex flex-col items-center gap-1">
				<div className="flex gap-1">
					<Text value="Login with auth0" className="text-sm" />
					<Button onClick={(_e) => signIn("auth0")} variant="custom">
						<Text
							value="here."
							isClickable
							className="text-sm text-orange"
						/>
					</Button>
				</div>
				<div className="flex gap-0.5">
					<Text value="Don't have an account? Register" className="text-sm" />
					<Link href={APP_ROUTES.REGISTER} className="text-sm">
						<Text
							value="here."
							isClickable
							className="text-sm text-orange"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;

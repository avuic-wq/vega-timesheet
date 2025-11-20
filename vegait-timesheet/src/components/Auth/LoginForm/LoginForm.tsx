"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import Button from "@/src/components/Shared/Button/Button";
import Form from "@/src/components/Shared/Form/Form";
import type { AuthFormData } from "@/src/components/Shared/Form/types";
import Text from "@/src/components/Shared/Text/Text";
import { APP_ROUTES } from "@/src/lib/consts";
import { authFormConfigFactory } from "@/src/lib/Factory/Auth/authFormConfigFactory";
import { loginAction } from "@/src/server-actions/auth/actions";

interface Props {
	callbackUrl?: string;
}

const LoginForm = ({ callbackUrl }: Props) => {
	const formConfig = authFormConfigFactory({ mode: "login" });

	const handleOnSubmit = async (formValues: AuthFormData) => {
		await loginAction(formValues, callbackUrl);
	};

	const initialValues: AuthFormData = {
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
			<div className="flex flex-col items-center">
				<div className="flex gap-0.5">
					<Text value="Login with auth0 credentials" className="text-sm" />
					<Button onClick={(_e) => signIn("auth0")} variant="custom">
						<Text
							value="here."
							className="text-sm text-orange hover:cursor-pointer"
						/>
					</Button>
				</div>
				<div className="flex gap-0.5">
					<Text value="Don't have an account? Register" className="text-sm" />
					<Link href={APP_ROUTES.REGISTER} className="text-sm">
						<Text
							value="here."
							className="text-sm text-orange hover:cursor-pointer"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;

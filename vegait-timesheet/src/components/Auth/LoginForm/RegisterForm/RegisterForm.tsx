"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/src/components/Shared/Button/Button";
import Form from "@/src/components/Shared/Form/Form";
import type { RegisterFormData } from "@/src/components/Shared/Form/types";
import Text from "@/src/components/Shared/Text/Text";
import { APP_ROUTES, AUTH_PROVIDERS } from "@/src/lib/consts";
import { authFormConfigFactory } from "@/src/lib/Factory/Auth/authFormConfigFactory";
import { registerAction } from "@/src/server-actions/auth/actions";

const RegisterForm = () => {
	const router = useRouter();
	const formConfig = authFormConfigFactory({ mode: "register" });

	const handleOnSubmit = async (formValues: RegisterFormData) => {
		const result = await registerAction(formValues);

		if (result?.isSuccessful) {
			router.push(APP_ROUTES.CLIENTS);
		}
	};

	const initialValues: RegisterFormData = {
		username: "",
		password: "",
		firstName: "",
		lastName: "",
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
					<Text value="Register with auth0" className="text-sm" />
					<Button
						onClick={(_e) => signIn(AUTH_PROVIDERS.AUTH0)}
						variant="custom"
					>
						<Text
							value="here."
							className="text-sm text-orange hover:cursor-pointer"
						/>
					</Button>
				</div>
				<div className="flex gap-0.5">
					<Text value="Already registered? Login" className="text-sm" />
					<Link href={APP_ROUTES.LOGIN} className="text-sm">
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

export default RegisterForm;

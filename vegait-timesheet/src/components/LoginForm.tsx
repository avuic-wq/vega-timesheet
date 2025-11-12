"use client";

import { useActionState } from "react";
import Button from "@/src/components/Button/Button";
import Text from "@/src/components/Text";
import TextField from "@/src/components/TextField";
import { loginAction } from "@/src/server-actions/auth/actions";

interface Props {
	callbackUrl?: string;
}

const LoginForm = ({ callbackUrl }: Props) => {
	const [errorMessage, formAction, isPending] = useActionState(
		loginAction,
		undefined,
	);

	return (
		<form action={formAction} className="space-y-4">
			<TextField
				name="username"
				placeholder="Username"
				isDisabled={isPending}
			/>
			<TextField
				name="password"
				placeholder="Password"
				isDisabled={isPending}
				isPassword
			/>

			<input type="hidden" name="callbackUrl" value={callbackUrl} />

			{errorMessage && (
				<Text value={errorMessage} className="text-red text-center mb-5" />
			)}

			<Button type="submit" isDisabled={isPending}>
				<Text value="Login" />
			</Button>
		</form>
	);
};

export default LoginForm;

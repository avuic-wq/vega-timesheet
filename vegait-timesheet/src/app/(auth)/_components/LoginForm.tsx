"use client";

import { useActionState } from "react";
import Button from "@/src/components/ui/Button";
import Text from "@/src/components/ui/Text";
import TextField from "@/src/components/ui/TextField";
import { authenticate } from "@/src/server-actions/User/authenticate";

interface Props {
	callbackUrl?: string;
}

export default function LoginForm({ callbackUrl }: Props) {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	const buttonStyle = errorMessage ? "pl-20 pr-20 mt-[20px]" : "pl-20 pr-20";

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
				<Text value={errorMessage} className="text-red text-center" />
			)}

			<Button
				text="Login"
				type="submit"
				isDisabled={isPending}
				className={buttonStyle}
			/>
		</form>
	);
}

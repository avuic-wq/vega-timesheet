"use client";

import { useActionState } from "react";
import Button from "@/src/components/Button";
import Text from "@/src/components/Text";
import TextField from "@/src/components/TextField";
import { loginAction } from "@/src/server-actions/authActions";

interface Props {
	callbackUrl?: string;
}

export default function LoginForm({ callbackUrl }: Props) {
	const [errorMessage, formAction, isPending] = useActionState(
		loginAction,
		undefined,
	);

	const buttonStyle = errorMessage ? "px-20 mt-[20px]" : "px-20";

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
				className={buttonStyle} // TO-DO: When passing tailwind classes are optimized
			/>
		</form>
	);
}

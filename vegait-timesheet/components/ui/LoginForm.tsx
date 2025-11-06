"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";
import Button from "./Button";
import Text from "./Text";
import TextField from "./TextField";

interface Props {
	callbackUrl?: string;
}

export default function LoginForm({ callbackUrl }: Props) {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	const buttonStyle = errorMessage
		? "pl-20 pr-20 mt-[25px]"
		: "pl-20 pr-20 mt-[45px]";

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

			{errorMessage ? (
				<Text value={errorMessage} className="text-red text-center" />
			) : null}

			<Button
				text="Login"
				type="submit"
				isDisabled={isPending}
				className={buttonStyle}
			/>
		</form>
	);
}

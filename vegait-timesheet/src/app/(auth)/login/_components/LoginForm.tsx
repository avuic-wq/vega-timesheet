"use client";

import { useActionState } from "react";
import { authenticate } from "@/src/server-actions/User/authenticate";
import Button from "../../../../components/ui/Button";
import Text from "../../../../components/ui/Text";
import TextField from "../../../../components/ui/TextField";

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

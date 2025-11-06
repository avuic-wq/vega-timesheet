"use client";

import { authenticate } from "@/app/actions/auth";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useActionState } from "react";

export default function LoginPage() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	return (
		<form action={formAction}>
			<TextField name="username" placeholder="Username" error={errorMessage} />
			<TextField
				name="password"
				placeholder="Password"
				error={errorMessage}
				isPassword
			/>
			<Button text="Login" type="submit" />
		</form>
	);
}

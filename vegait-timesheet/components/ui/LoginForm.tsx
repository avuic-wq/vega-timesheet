"use client";

import { authenticate } from "@/app/actions/auth";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useActionState } from "react";

export default function LoginForm() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	return (
		<form action={formAction} className="space-y-4">
			<TextField
				name="username"
				placeholder="Username"
				error={errorMessage}
				isDisabled={isPending}
			/>

			<TextField
				name="password"
				placeholder="Password"
				error={errorMessage}
				isDisabled={isPending}
				isPassword
			/>

			<Button
				text={isPending ? "Logging in..." : "Login"}
				type="submit"
				isDisabled={isPending}
			/>
		</form>
	);
}

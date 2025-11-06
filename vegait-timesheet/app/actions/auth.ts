"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth/auth";
import { AUTH_ERRORS_KEYS, AUTH_PROVIDERS } from "@/lib/consts";

export async function authenticate(
	_prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn(AUTH_PROVIDERS.CREDENTIALS, {
			username: formData.get("username"),
			password: formData.get("password"),
			redirectTo: "/clients",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case AUTH_ERRORS_KEYS.INVALID_CREDENTIALS:
					return "Invalid username or password";
				default:
					return "Something went wrong";
			}
		}
		throw error;
	}
}

"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth/auth";
import {
	AUTH_ERRORS_KEYS,
	AUTH_ERRORS_MESSAGES,
	AUTH_PROVIDERS,
	HOME_PAGE_ROUTE,
} from "@/src/lib/consts";

export async function authenticate(
	_prevState: string | undefined,
	formData: FormData,
) {
	const callbackUrl = String(formData.get("callbackUrl")) || HOME_PAGE_ROUTE;
	try {
		await signIn(AUTH_PROVIDERS.CREDENTIALS, {
			username: formData.get("username"),
			password: formData.get("password"),
			redirectTo: callbackUrl,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case AUTH_ERRORS_KEYS.INVALID_CREDENTIALS:
					return AUTH_ERRORS_MESSAGES.CredentialsSignin;
				default:
					return "Something went wrong";
			}
		}
		throw error;
	}
}

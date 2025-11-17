"use server";

import { signIn, signOut } from "@/auth/auth";
import type { LoginFormData } from "@/src/components/Form/types";
import { APP_ROUTES, AUTH_PROVIDERS, HOME_PAGE_ROUTE } from "@/src/lib/consts";

export async function loginAction(
	formData: LoginFormData,
	callbackUrl?: string,
): Promise<void> {
	const redirectUrl = callbackUrl || HOME_PAGE_ROUTE;

	try {
		await signIn(AUTH_PROVIDERS.CREDENTIALS, {
			username: formData?.username,
			password: formData?.password,
			redirectTo: redirectUrl,
		});
	} catch (error) {
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error;
		}
	}
}

export async function logoutAction() {
	await signOut({ redirectTo: APP_ROUTES.LOGIN, redirect: true });
}

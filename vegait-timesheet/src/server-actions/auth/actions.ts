"use server";

import { signIn, signOut } from "@/auth/auth";
import type {
	LoginFormData,
	RegisterFormData,
} from "@/src/components/Shared/Form/types";
import { register } from "@/src/db/AuthService/service";
import { fetchAllUsers } from "@/src/db/UserService/service.ts";
import { APP_ROUTES, AUTH_PROVIDERS, HOME_PAGE_ROUTE } from "@/src/lib/consts";
import type {
	LoginActionResult,
	RegisterActionResult,
} from "@/src/server-actions/auth/types";

export async function loginAction(
	formData: LoginFormData,
	callbackUrl?: string,
): LoginActionResult {
	const redirectUrl = callbackUrl || HOME_PAGE_ROUTE;

	try {
		await signIn(AUTH_PROVIDERS.CREDENTIALS, {
			username: formData?.username,
			password: formData?.password,
			redirectTo: redirectUrl,
		});

		return { isSuccessful: true };
	} catch (error) {
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error;
		}
		return {
			errors: {},
		};
	}
}

export async function registerAction(
	formData: RegisterFormData,
): RegisterActionResult {
	try {
		const newUser = await register({
			username: formData.username,
			password: formData.password,
			firstName: formData.firstName,
			lastName: formData.lastName,
		});

		if (!newUser) {
			return {
				errors: { general: "Registration failed" },
			};
		}

		await loginAction(
			{
				username: formData.username,
				password: formData.password,
			},
			HOME_PAGE_ROUTE,
		);
	} catch (error) {
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error;
		}

		return {
			errors: {},
		};
	}
}

export async function logoutAction() {
	try {
		await signOut({ redirectTo: APP_ROUTES.LOGIN, redirect: true });
	} catch (error) {
		if (error instanceof Error && error.message === "NEXT_REDIRECT") {
			throw error;
		}
	}
}

export async function getAllUsersAction() {
	const users = await fetchAllUsers();
	return users;
}

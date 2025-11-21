"use server";

import { redirect } from "next/navigation";
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
		await signOut({ redirect: false });

		const loginUrl = `${process.env.BASE_RUL}${APP_ROUTES.LOGIN}`;

		const auth0LogoutUrl =
			`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
			new URLSearchParams({
				returnTo: loginUrl,
				client_id: process.env.AUTH0_CLIENT_ID || "",
			});

		redirect(auth0LogoutUrl);
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

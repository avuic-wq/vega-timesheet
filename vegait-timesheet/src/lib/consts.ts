import type { AuthErrorKey } from "./types";

export const DEFAULT_SALT_ROUNDS: number = 10;
export const HOME_PAGE_ROUTE = "/clients";

export const AUTH_PROVIDERS = {
	CREDENTIALS: "credentials",
};

export const AUTH_ERRORS_KEYS: Record<string, string> = {
	INVALID_CREDENTIALS: "CredentialsSignin",
} as const;

export const AUTH_ERRORS_VALUES: Record<AuthErrorKey, string> = {
	CredentialsSignin: "Invalid credentials",
};

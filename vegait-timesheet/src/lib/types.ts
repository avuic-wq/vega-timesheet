import type { AUTH_ERRORS_KEYS } from "./consts";

export type AuthErrorKey =
	(typeof AUTH_ERRORS_KEYS)[keyof typeof AUTH_ERRORS_KEYS];

export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	startsWith?: string;
	page?: string;
}>;

export type ButtonVariant = "primary" | "secondary" | "danger" | "custom";

import type { AUTH_ERRORS_KEYS } from "./consts";

export type AuthErrorKey =
	(typeof AUTH_ERRORS_KEYS)[keyof typeof AUTH_ERRORS_KEYS];
export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	letterFilter?: string;
}>;

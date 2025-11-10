import type { AUTH_ERRORS_KEYS } from "./consts";

export type AuthErrorKey =
	(typeof AUTH_ERRORS_KEYS)[keyof typeof AUTH_ERRORS_KEYS];

// TO-DO: Connect this type to const SEARCH_PARAMETERS somehow so we cant add on one place and miss in other
export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	letterFilter?: string;
	page?: string;
}>;

// TO-DO: Type all actions/service functions (return result)
// TO-DO LOW-PRIO: Add __typename to the DB or inject it in actions/services ?

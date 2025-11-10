import type { AUTH_ERRORS_KEYS } from "./consts";

export type AuthErrorKey =
	(typeof AUTH_ERRORS_KEYS)[keyof typeof AUTH_ERRORS_KEYS];

// TO-DO: Connect this type to const SEARCH_PARAMETERS somehow so we can change in one place and
// 		   get the error in another place if we dont sync
export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	startsWith?: string;
	page?: string;
}>;

// TO-DO: Type all actions/service functions (return result)
// TO-DO LOW-PRIO: Add __typename to the DB or inject it in actions/services ?

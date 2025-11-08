import type { AuthErrorKey } from "./types";

export const DEFAULT_SALT_ROUNDS: number = 10;
export const DEBOUNCE_TIME = {
	DEFAULT: 500,
	LETTER_FILTER_CLICK: 400,
};

export const HOME_PAGE_ROUTE = "/clients";

// TO-DO: APP_ROUTES { PRIVATE: {...}, PUBLIC: {...} }
// CHECK: SAFE TYPE ROUTES?
export const APP_ROUTES = {
	LOGIN: "/login",
	CLIENTS: HOME_PAGE_ROUTE,
	PROJECTS: "/projects",
	TIMESHEET: "/timesheet",
	REPORTS: "/reports",
};

export const SEARCH_PARAMETERS = {
	SEARCH: "search",
	LETTER_FILTER: "letterFilter",
};

export const AUTH_PROVIDERS = {
	CREDENTIALS: "credentials",
};

export const AUTH_ERRORS_KEYS: Record<string, string> = {
	INVALID_CREDENTIALS: "CredentialsSignin",
} as const;

export const AUTH_ERRORS_MESSAGES: Record<AuthErrorKey, string> = {
	CredentialsSignin: "Invalid credentials",
};

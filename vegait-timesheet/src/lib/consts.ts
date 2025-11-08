import type { AuthErrorKey } from "./types";

export const DEFAULT_SALT_ROUNDS: number = 10;
export const DEFAULT_DEBOUNCE_TIME: number = 500;
export const HOME_PAGE_ROUTE = "/clients";

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

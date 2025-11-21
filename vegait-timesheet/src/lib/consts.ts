export const DEFAULT_SALT_ROUNDS: number = 10;
export const DEBOUNCE_TIME = {
	DEFAULT: 500,
	LETTER_FILTER_CLICK: 300,
};

export const INITIAL_LIST_PAGE = 1;
export const ITEMS_PER_PAGE = {
	DEFAULT: 10,
};

export const HOME_PAGE_ROUTE = "/clients";

export const APP_ROUTES = {
	LOGIN: "/login",
	REGISTER: "/register",
	CLIENTS: "/clients",
	PROJECTS: "/projects",
	TIMESHEET: "/timesheet",
	REPORTS: "/reports",
};

export const SEARCH_PARAMETERS: Record<string, string> = {
	SEARCH: "search",
	LETTER_FILTER: "startsWith",
	PAGINATION: "page",
};

export const AUTH_PROVIDERS = {
	CREDENTIALS: "credentials",
	AUTH0: "auth0",
};

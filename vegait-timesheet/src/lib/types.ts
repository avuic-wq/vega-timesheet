import type { Client, Project } from "@prisma/client";
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

// SAFETY LAYER FOR MODEL/ENTITY objects
// TO-DO LOW-PRIO: Add __typename to the DB or inject it in actions/services ?
export type ClientType = Client & { __typename: "client" };
export type ProjectType = Project & { __typename: "project" };

// TO-DO: Type all actions/service function
export type PaginatedAndFilteredClientsFetchResult = {
	clients: Client[];
	totalCount: number;
};

export type PaginatedAndFilteredClientsActionResult = {
	clients: Client[];
	totalPages: number;
};

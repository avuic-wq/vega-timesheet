import type { Client, Project } from "@prisma/client";
import type { AUTH_ERRORS_KEYS } from "./consts";

export type AuthErrorKey =
	(typeof AUTH_ERRORS_KEYS)[keyof typeof AUTH_ERRORS_KEYS];

// TO-DO: Type SEARCH_PARAMETERS const with this or?
export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	letterFilter?: string;
}>;

// SAFETY LAYER FOR MODEL/ENTITY objects
// TO-DO: Add __typename to the DB or inject it in actions/services ?
export type ClientType = Client & { __typename: "client" };
export type ProjectType = Project & { __typename: "project" };

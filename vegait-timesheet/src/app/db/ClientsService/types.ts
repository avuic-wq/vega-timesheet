import type { Client } from "@prisma/client";

export type FetchAllClientsResult = Promise<Client[]>;

export type FetchPaginatedAndFilteredClientsResult = Promise<{
	clients: Client[];
	totalCount: number;
}>;

export type FetchClientsFirstLettersResult = Promise<string[]>;

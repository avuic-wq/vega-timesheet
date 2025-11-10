import type { Client } from "@prisma/client";

export type FetchPaginatedAndFilteredClientsResult = {
	clients: Client[];
	totalCount: number;
};

export type FetchClientFirstLettersResult = string[];

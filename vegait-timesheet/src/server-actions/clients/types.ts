import type { Client } from "@prisma/client";

export type GetAllClientsActionResult = Promise<Client[]>;

export type GetPaginatedAndFilteredClientsActionResult = Promise<{
	clients: Client[];
	totalPages: number;
}>;

export type GetClientsFirstLettersActionResult = Promise<string[]>;

import type { Client } from "@prisma/client";

export type GetAllClientsActionResult = Client[];

export type GetPaginatedAndFilteredClientsActionResult = {
	clients: Client[];
	totalPages: number;
};

export type GetClientsFirstLettersActionResult = string[];

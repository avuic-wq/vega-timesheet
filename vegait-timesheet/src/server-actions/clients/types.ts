import type { Client } from "@prisma/client";

export type GetPaginatedAndFilteredClientsActionResult = {
	clients: Client[];
	totalPages: number;
};

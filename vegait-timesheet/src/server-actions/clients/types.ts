import type { Client } from "@prisma/client";
import type {
	ClientFormData,
	QueryState,
} from "@/src/components/Shared/Form/types";

export type GetPaginatedAndFilteredClientsActionResult = Promise<{
	clients: Client[];
	totalPages: number;
}>;
export type GetAllClientsActionResult = Promise<Client[]>;
export type GetClientsFirstLettersActionResult = Promise<string[]>;
export type GetClientByIdActionResult = Promise<Client>;

export type CreateClientActionResult = Promise<QueryState<ClientFormData>>;
export type UpdateClientActionResult = Promise<QueryState<ClientFormData>>;
export type DeleteClientActionResult = Promise<QueryState<ClientFormData>>;

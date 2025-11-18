import type { Client } from "@prisma/client";
import type {
	ClientFormData,
	FormState,
} from "@/src/components/Shared/Form/types";

export type GetPaginatedAndFilteredClientsActionResult = Promise<{
	clients: Client[];
	totalPages: number;
}>;
export type GetAllClientsActionResult = Promise<Client[]>;
export type GetClientsFirstLettersActionResult = Promise<string[]>;
export type GetClientByIdActionResult = Promise<Client>;

export type CreateClientActionResult = Promise<FormState<ClientFormData>>;
export type UpdateClientActionResult = Promise<FormState<ClientFormData>>;
export type DeleteClientActionResult = Promise<FormState<ClientFormData>>;

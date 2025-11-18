"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ClientFormData } from "@/src/components/Shared/Form/types";
import {
	createClient,
	deleteClient,
	fetchAllClients,
	fetchClientById,
	fetchClientsFirstLetters,
	fetchPaginatedAndFilteredClients,
	updateClient,
} from "@/src/db/ClientService/service";
import { APP_ROUTES, ITEMS_PER_PAGE } from "@/src/lib/consts";
import { clientsModalSchema } from "@/src/lib/validators/Clients/schemas";
import type {
	CreateClientActionResult,
	DeleteClientActionResult,
	GetAllClientsActionResult,
	GetClientsFirstLettersActionResult,
	GetPaginatedAndFilteredClientsActionResult,
	UpdateClientActionResult,
} from "./types";

// TO-DO: Return types
// TO-DO: Validation
// TO-DO: Error handling

export async function getAllClientsAction(): GetAllClientsActionResult {
	const clients = fetchAllClients();
	return clients;
}

export async function getClientsFirstLettersAction(): GetClientsFirstLettersActionResult {
	return fetchClientsFirstLetters();
}

export async function getPaginatedAndFileterdClientsAction(
	page: number,
	searchInput?: string,
	letterFilter?: string,
): GetPaginatedAndFilteredClientsActionResult {
	const itemsPerPage = ITEMS_PER_PAGE.DEFAULT;

	const { clients, totalCount } = await fetchPaginatedAndFilteredClients(
		page,
		itemsPerPage,
		searchInput,
		letterFilter,
	);

	const totalPages = Math.ceil(totalCount / itemsPerPage);
	if (page > totalPages && totalPages > 0) {
		redirect(
			`?page=1${searchInput ? `&search=${searchInput}` : ""}${letterFilter ? `&letterFilter=${letterFilter}` : ""}`,
		);
	}

	return {
		clients,
		totalPages,
	};
}

export async function getClientByIdAction(id: string) {
	try {
		const client = await fetchClientById(id);
		return client;
	} catch (error) {}
}

export async function createClientAction(
	formData: ClientFormData,
): CreateClientActionResult {
	try {
		const result = await createClient(formData);

		const createdClient: ClientFormData = {
			name: result.name,
			address: result.address,
			countryCode: result.countryCode,
		};

		revalidatePath(APP_ROUTES.CLIENTS);
		return { isSuccessful: true, data: createdClient };
	} catch (error) {
		return {
			errors: {
				database: "There was a problem creating the client in the database",
			},
		};
	}
}

export async function updateClientAction(
	id: string,
	formData: ClientFormData,
): UpdateClientActionResult {
	const rawData = {
		name: formData?.name,
		address: formData?.address,
		countryCode: formData?.countryCode,
	};

	const validation = clientsModalSchema.safeParse(rawData);

	if (!validation.success) {
		return {
			errors: undefined,
		};
	}

	try {
		const result = await updateClient(id, validation.data);
		const updatedClient = {
			name: result.name,
			address: result.address,
			countryCode: result.countryCode,
		};

		revalidatePath(APP_ROUTES.CLIENTS);
		revalidatePath(`/clients/${id}`);
		return { isSuccessful: true, data: updatedClient };
	} catch (error) {
		return {
			errors: {
				database: "There was a problem updating the client in the database",
			},
		};
	}
}

export async function deleteClientAction<T>(
	id: string,
): DeleteClientActionResult {
	try {
		const result = await deleteClient(id);
		const deletedClient: ClientFormData = {
			name: result.name,
			address: result.address,
			countryCode: result.countryCode,
		};

		revalidatePath(APP_ROUTES.CLIENTS);
		revalidatePath(`${APP_ROUTES.CLIENTS}/${id}`);
		return { isSuccessful: true, data: deletedClient };
	} catch (error) {
		return {
			errors: {
				database: "There was a problem deleting the client in the database",
			},
		};
	}
}

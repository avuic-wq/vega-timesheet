"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import {
	deleteClient,
	fetchAllClients,
	fetchClientById,
	fetchClientsFirstLetters,
	fetchPaginatedAndFilteredClients,
	updateClient,
} from "@/src/app/db/ClientsService/service";
import { ITEMS_PER_PAGE } from "@/src/lib/consts";
import { clientsModalSchema } from "@/src/lib/validators/Clients/schemas";
import type {
	GetAllClientsActionResult,
	GetClientsFirstLettersActionResult,
	GetPaginatedAndFilteredClientsActionResult,
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

export async function getClientById(id: string) {
	const client = await fetchClientById(id);
	return client;
}

export async function updateClientAction(id: string, formData: FormData) {
	const rawData = {
		name: formData.get("client-name"),
		address: formData.get("client-address"),
		countryCode: formData.get("client-countryISO"),
	};

	const validation = clientsModalSchema.safeParse(rawData);

	if (!validation.success) {
		return z.treeifyError(validation.error);
	}

	try {
		const updatedClient = await updateClient(id, validation.data);
		revalidatePath("/clients");
		revalidatePath(`/clients/${id}`);
		return { isRequestSuccessful: true, data: updatedClient };
	} catch (error) {}
}

export async function deleteClientAction(id: string) {
	try {
		const deletedClient = await deleteClient(id);
		revalidatePath("/clients");
		revalidatePath(`/clients/${id}`);
		return { isRequestSuccessful: true, data: deletedClient };
	} catch (error) {}
}

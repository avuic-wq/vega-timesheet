"use server";

import type { Client } from "@prisma/client";
import {
	fetchAllClients,
	fetchClientFirstLetters,
	fetchClientsWithFilters,
} from "@/src/app/db/clientService";

export async function getAllClientsAction(): Promise<Client[]> {
	const clients = fetchAllClients();
	return clients;
}

export async function getFilteredClientsAction(
	searchInput?: string,
	letterFilter?: string,
): Promise<Client[]> {
	return fetchClientsWithFilters(searchInput, letterFilter);
}

export async function getClientFirstLettersAction(): Promise<string[]> {
	return fetchClientFirstLetters();
}

"use server";

import type { Client } from "@prisma/client";
import { redirect } from "next/navigation";
import {
	fetchAllClients,
	fetchClientFirstLetters,
	fetchPaginatedAndFilteredClients,
} from "@/src/app/db/ClientsService/service";
import { ITEMS_PER_PAGE } from "@/src/lib/consts";
import type { GetPaginatedAndFilteredClientsActionResult } from "./types";

export async function getAllClientsAction(): Promise<Client[]> {
	const clients = fetchAllClients();
	return clients;
}

export async function getPaginatedAndFileterdClientsAction(
	page: number,
	searchInput?: string,
	letterFilter?: string,
): Promise<GetPaginatedAndFilteredClientsActionResult> {
	const itemsPerPage = ITEMS_PER_PAGE.DEFAULT;

	const { clients, totalCount } = await fetchPaginatedAndFilteredClients(
		page,
		itemsPerPage,
		searchInput,
		letterFilter,
	);

	const totalPages = Math.ceil(totalCount / itemsPerPage);
	if (page > totalPages && totalPages > 0) {
		// Redirect to page 1 if page is out of bounds
		// TO-DO: TEST!!! This feels odd
		redirect(
			`?page=1${searchInput ? `&search=${searchInput}` : ""}${letterFilter ? `&letterFilter=${letterFilter}` : ""}`,
		);
	}

	return {
		clients,
		totalPages,
	};
}

export async function getClientFirstLettersAction(): Promise<string[]> {
	return fetchClientFirstLetters();
}

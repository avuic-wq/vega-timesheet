"use server";

import { redirect } from "next/navigation";
import {
	fetchAllClients,
	fetchClientById,
	fetchClientsFirstLetters,
	fetchPaginatedAndFilteredClients,
} from "@/src/app/db/ClientsService/service";
import { ITEMS_PER_PAGE } from "@/src/lib/consts";
import type {
	GetAllClientsActionResult,
	GetClientsFirstLettersActionResult,
	GetPaginatedAndFilteredClientsActionResult,
} from "./types";

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

import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma/prisma";

import type {
	FetchAllClientsResult,
	FetchClientsFirstLettersResult,
	FetchPaginatedAndFilteredClientsResult,
} from "./types";

export const fetchAllClients = async (): FetchAllClientsResult => {
	return prisma.client.findMany({
		orderBy: { name: "asc" },
	});
};

export const fetchClientsFirstLetters =
	unstable_cache(async (): FetchClientsFirstLettersResult => {
		const letterObjects = await prisma.$queryRaw<{ first_letter: string }[]>`
		SELECT DISTINCT UPPER(SUBSTRING(name FROM 1 FOR 1)) AS first_letter
		FROM "clients"
		ORDER BY first_letter ASC;`;

		return letterObjects.map((obj) => obj.first_letter);
	}, ["clients-filters-all-letters"]);

export const fetchPaginatedAndFilteredClients = async (
	page: number,
	itemsPerPage: number,
	searchInput?: string,
	letterFilter?: string,
): FetchPaginatedAndFilteredClientsResult => {
	const conditions: Prisma.ClientWhereInput[] = [];

	if (searchInput) {
		conditions.push({
			name: { contains: searchInput, mode: "insensitive" },
		});
	}

	if (letterFilter) {
		conditions.push({
			name: { startsWith: letterFilter, mode: "insensitive" },
		});
	}

	const where = conditions.length > 0 ? { AND: conditions } : {};

	const [clients, totalCount] = await Promise.all([
		prisma.client.findMany({
			where,
			orderBy: { name: "asc" },
			skip: (page - 1) * itemsPerPage,
			take: itemsPerPage,
		}),
		prisma.client.count({ where }),
	]);

	return { clients, totalCount };
};

export const fetchClientById = async (id: string) => {
	const client = await prisma.client.findUnique({
		where: { id },
	});
	return client;
};

import type { Client, Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma/prisma";
import type { PaginatedAndFilteredClientsFetchResult } from "@/src/lib/types";

export const fetchAllClients = unstable_cache(async () => {
	return prisma.client.findMany({
		orderBy: { name: "asc" },
	});
}, ["clients-all"]);

export const fetchPaginatedAndFilteredClients = unstable_cache(
	async (
		page: number,
		itemsPerPage: number,
		searchInput?: string,
		letterFilter?: string,
	): Promise<PaginatedAndFilteredClientsFetchResult> => {
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
	},
	["clients-filtered"],
);

// TO-DO: CACHE once and always read from cache
export const fetchClientFirstLetters = unstable_cache(async () => {
	const letterObjects = await prisma.$queryRaw<{ first_letter: string }[]>`
		SELECT DISTINCT UPPER(SUBSTRING(name FROM 1 FOR 1)) AS first_letter
		FROM "clients"
		ORDER BY first_letter ASC;`;

	return letterObjects.map((obj) => obj.first_letter);
}, ["filter-all-letters"]);

export async function createClient(data: {
	name: string;
	countryCode: string;
	address?: string;
}): Promise<Client> {
	const createdClient = await prisma.client.create({
		data: {
			name: data.name,
			countryCode: data.countryCode,
			address: data.address,
		},
	});
	return createdClient;
}

export async function updateClient(
	id: string,
	data: Partial<Omit<Client, "id" | "createdAt" | "updatedAt">>,
): Promise<Client> {
	const updatedClient = await prisma.client.update({
		where: { id },
		data,
	});
	return updatedClient;
}

export async function deleteClient(id: string): Promise<Client> {
	return prisma.client.delete({
		where: { id },
	});
}

// export async function fetchClientById(id: string): Promise<Client | null> {
// 	return prisma.client.findUnique({
// 		where: { id },
// 	});
// }

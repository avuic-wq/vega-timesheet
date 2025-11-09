import type { Client, Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma/prisma";

export const fetchAllClients = unstable_cache(async () => {
	return prisma.client.findMany({
		orderBy: { name: "asc" },
	});
}, ["clients-all"]);

// CHECK: Cache only on filter change / not on page change (with nav)
export const fetchClientsWithFilters = unstable_cache(
	async (searchInput?: string, letterFilter?: string): Promise<Client[]> => {
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

		const results = await prisma.client.findMany({
			where: conditions.length > 0 ? { AND: conditions } : {},
			orderBy: { name: "asc" },
		});

		return results;
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

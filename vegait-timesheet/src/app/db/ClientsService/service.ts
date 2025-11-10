import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma/prisma";
import type {
	FetchClientFirstLettersResult,
	FetchPaginatedAndFilteredClientsResult,
} from "./types";

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
	): Promise<FetchPaginatedAndFilteredClientsResult> => {
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

export const fetchClientFirstLetters =
	unstable_cache(async (): Promise<FetchClientFirstLettersResult> => {
		const letterObjects = await prisma.$queryRaw<{ first_letter: string }[]>`
		SELECT DISTINCT UPPER(SUBSTRING(name FROM 1 FOR 1)) AS first_letter
		FROM "clients"
		ORDER BY first_letter ASC;`;

		return letterObjects.map((obj) => obj.first_letter);
	}, ["filter-all-letters"]);

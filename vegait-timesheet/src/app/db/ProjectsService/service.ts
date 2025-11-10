import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma/prisma";
import type {
	FetchAllProjcetsResult,
	FetchPaginatedAndFilteredProjectsResult,
	FetchProjectsFirstLettersResult,
} from "./types";

export const fetchAllProjects =
	unstable_cache(async (): Promise<FetchAllProjcetsResult> => {
		return prisma.project.findMany({
			orderBy: { name: "asc" },
		});
	}, ["projects-all"]);

export const fetchPaginatedAndFilteredProjects = unstable_cache(
	async (
		page: number,
		itemsPerPage: number,
		searchInput?: string,
		letterFilter?: string,
	): Promise<FetchPaginatedAndFilteredProjectsResult> => {
		const conditions: Prisma.ProjectWhereInput[] = [];

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

		const [projects, totalCount] = await Promise.all([
			prisma.project.findMany({
				where,
				orderBy: { name: "asc" },
				skip: (page - 1) * itemsPerPage,
				take: itemsPerPage,
			}),
			prisma.project.count({ where }),
		]);

		return { projects, totalCount };
	},
	["projects-filtered"],
);

export const fetchProjectsFirstLetters =
	unstable_cache(async (): Promise<FetchProjectsFirstLettersResult> => {
		const letterObjects = await prisma.$queryRaw<{ first_letter: string }[]>`
		SELECT DISTINCT UPPER(SUBSTRING(name FROM 1 FOR 1)) AS first_letter
		FROM "projects"
		ORDER BY first_letter ASC;`;

		return letterObjects.map((obj) => obj.first_letter);
	}, ["projects-filters-all-letters"]);

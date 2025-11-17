import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma/prisma";
import type {
	FetchAllProjcetsResult,
	FetchPaginatedAndFilteredProjectsResult,
	FetchProjectsFirstLettersResult,
} from "./types";

// TO-DO: Return types
// TO-DO: Validation

export const fetchAllProjects = async (): Promise<FetchAllProjcetsResult> => {
	return prisma.project.findMany({
		orderBy: { name: "asc" },
	});
};

export const fetchPaginatedAndFilteredProjects = async (
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
			include: {
				client: { select: { name: true } },
				industry: { select: { name: true } },
			},
		}),
		prisma.project.count({ where }),
	]);

	const extendedProject = projects.map((p) => ({
		...p,
		clientName: p.client.name,
		industryName: p.industry.name,
	}));

	return { projects: extendedProject, totalCount };
};

export const fetchProjectsFirstLetters =
	unstable_cache(async (): Promise<FetchProjectsFirstLettersResult> => {
		const letterObjects = await prisma.$queryRaw<{ first_letter: string }[]>`
		SELECT DISTINCT UPPER(SUBSTRING(name FROM 1 FOR 1)) AS first_letter
		FROM "projects"
		ORDER BY first_letter ASC;`;

		return letterObjects.map((obj) => obj.first_letter);
	}, ["projects-filters-all-letters"]);

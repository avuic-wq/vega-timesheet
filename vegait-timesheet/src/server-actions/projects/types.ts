import type { Project } from "@prisma/client";

export type GetAllProjectsActionResult = Promise<Project[]>;

export type GetPaginatedAndFilteredProjectsActionResult = Promise<{
	projects: Project[];
	totalPages: number;
}>;

export type GetProjectsFirstLettersActionResult = Promise<string[]>;

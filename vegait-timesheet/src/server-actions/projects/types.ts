import type { Project } from "@prisma/client";
import type { ProjectItem } from "@/src/components/List/types";

export type GetAllProjectsActionResult = Promise<Project[]>;

export type GetPaginatedAndFilteredProjectsActionResult = Promise<{
	projects: ProjectItem[];
	totalPages: number;
}>;

export type GetProjectsFirstLettersActionResult = Promise<string[]>;

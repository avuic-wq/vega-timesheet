import type { Project } from "@prisma/client";

export type FetchAllProjcetsResult = Promise<Project[]>;

export type FetchPaginatedAndFilteredProjectsResult = Promise<{
	projects: Project[];
	totalCount: number;
}>;

export type FetchProjectsFirstLettersResult = Promise<string[]>;

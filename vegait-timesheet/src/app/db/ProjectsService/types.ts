import type { Project } from "@prisma/client";
import type { ProjectItem } from "@/src/components/List/types";

export type FetchAllProjcetsResult = Promise<Project[]>;

export type FetchPaginatedAndFilteredProjectsResult = Promise<{
	projects: ProjectItem[];
	totalCount: number;
}>;

export type FetchProjectsFirstLettersResult = Promise<string[]>;

import type { Project } from "@prisma/client";
import type {
	ProjectFormData,
	QueryState,
} from "@/src/components/Shared/Form/types";
import type { ProjectItem } from "@/src/components/Shared/List/types";

export type GetPaginatedAndFilteredProjectsActionResult = Promise<{
	projects: ProjectItem[];
	totalPages: number;
}>;
export type GetAllProjectsActionResult = Promise<Project[]>;
export type GetProjectsFirstLettersActionResult = Promise<string[]>;
export type GetProjectByIdActionResult = Promise<Project>;

export type CreateProjectActionResult = Promise<QueryState<ProjectFormData>>;
export type UpdateProjectActionResult = Promise<QueryState<ProjectFormData>>;
export type DeleteProjectActionResult = Promise<QueryState<ProjectFormData>>;

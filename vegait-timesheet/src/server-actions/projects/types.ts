import type { Project } from "@prisma/client";
import type { FormState, ProjectFormData } from "@/src/components/Form/types";
import type { ProjectItem } from "@/src/components/List/types";

export type GetPaginatedAndFilteredProjectsActionResult = Promise<{
	projects: ProjectItem[];
	totalPages: number;
}>;
export type GetAllProjectsActionResult = Promise<Project[]>;
export type GetProjectsFirstLettersActionResult = Promise<string[]>;
export type GetProjectByIdActionResult = Promise<Project>;

export type CreateProjectActionResult = Promise<FormState<ProjectFormData>>;
export type UpdateProjectActionResult = Promise<FormState<ProjectFormData>>;
export type DeleteProjectActionResult = Promise<FormState<ProjectFormData>>;

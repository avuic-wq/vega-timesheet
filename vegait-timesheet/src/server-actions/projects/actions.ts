"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
	createProject,
	deleteProject,
	fetchAllProjects,
	fetchPaginatedAndFilteredProjects,
	fetchProjectById,
	fetchProjectsFirstLetters,
	updateProject,
} from "@/src/app/db/ProjectsService/service";
import type { ProjectFormData } from "@/src/components/Form/types";
import {
	APP_ROUTES,
	ITEMS_PER_PAGE,
	SEARCH_PARAMETERS,
} from "@/src/lib/consts";
import type {
	CreateProjectActionResult,
	DeleteProjectActionResult,
	GetAllProjectsActionResult,
	GetPaginatedAndFilteredProjectsActionResult,
	GetProjectByIdActionResult,
	GetProjectsFirstLettersActionResult,
	UpdateProjectActionResult,
} from "./types";

// TO-DO: Return types
// TO-DO: Validation
// TO-DO: Error handling

const getPageOutOfBoundsRedirectUrl = (
	searchInput?: string,
	letterFilter?: string,
) => {
	return `?${SEARCH_PARAMETERS.PAGINATION}=1${searchInput ? `&search=${searchInput}` : ""}${letterFilter ? `&letterFilter=${letterFilter}` : ""}`;
};

export async function getAllProjectsAction(): GetAllProjectsActionResult {
	const projects = fetchAllProjects();
	return projects;
}

export async function getPaginatedAndFilteredProjectsAction(
	page: number,
	searchInput?: string,
	letterFilter?: string,
): GetPaginatedAndFilteredProjectsActionResult {
	const itemsPerPage = ITEMS_PER_PAGE.DEFAULT;

	const { projects, totalCount } = await fetchPaginatedAndFilteredProjects(
		page,
		itemsPerPage,
		searchInput,
		letterFilter,
	);

	const totalPages = Math.ceil(totalCount / itemsPerPage);

	if (page > totalPages && totalPages > 0) {
		const url = getPageOutOfBoundsRedirectUrl(searchInput, letterFilter);
		redirect(url);
	}

	return {
		projects,
		totalPages,
	};
}

export async function getProjectsFirstLettersAction(): GetProjectsFirstLettersActionResult {
	return fetchProjectsFirstLetters();
}

export async function getProjectByIdAction(
	id: string,
): GetProjectByIdActionResult {
	try {
		const project = await fetchProjectById(id);
		return project;
	} catch (error) {}
}

export async function createProjectAction(
	formData: ProjectFormData,
): CreateProjectActionResult {
	try {
		const result = await createProject(formData);

		const createdProject: ProjectFormData = {
			name: result.name,
			clientId: result.clientId,
			industryId: result.industryId,
		};

		revalidatePath(APP_ROUTES.PROJECTS);
		return { isSuccessful: true, data: createdProject };
	} catch (error) {
		return {
			errors: {
				database: "There was a problem creating the project in the database",
			},
		};
	}
}

export async function updateProjectAction(
	id: string,
	formData: ProjectFormData,
): UpdateProjectActionResult {
	try {
		const result = await updateProject(id, formData);

		const updatedProject: ProjectFormData = {
			name: result.name,
			clientId: result.clientId,
			industryId: result.industryId,
		};

		revalidatePath(APP_ROUTES.PROJECTS);
		return { isSuccessful: true, data: updatedProject };
	} catch (error) {
		return {
			errors: {
				database: "There was a problem updating the project in the database",
			},
		};
	}
}

export async function deleteProjectAction(
	id: string,
): DeleteProjectActionResult {
	try {
		const result = await deleteProject(id);

		const deletedProject: ProjectFormData = {
			name: result.name,
			clientId: result.clientId,
			industryId: result.industryId,
		};

		revalidatePath(APP_ROUTES.PROJECTS);
		return { isSuccessful: true, data: deletedProject };
	} catch (error) {
		return {
			errors: {
				database: "There was a problem deleting the project in the database",
			},
		};
	}
}

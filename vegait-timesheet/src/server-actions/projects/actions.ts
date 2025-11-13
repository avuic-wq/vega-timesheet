"use server";

import { redirect } from "next/navigation";
import {
	fetchAllProjects,
	fetchPaginatedAndFilteredProjects,
	fetchProjectsFirstLetters,
} from "@/src/app/db/ProjectsService/service";
import { ITEMS_PER_PAGE, SEARCH_PARAMETERS } from "@/src/lib/consts";
import type {
	GetAllProjectsActionResult,
	GetPaginatedAndFilteredProjectsActionResult,
	GetProjectsFirstLettersActionResult,
} from "./types";

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

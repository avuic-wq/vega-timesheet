"use server";

import { redirect } from "next/navigation";
import {
	fetchAllProjects,
	fetchPaginatedAndFilteredProjects,
	fetchProjectsFirstLetters,
} from "@/src/app/db/ProjectsService/service";
import { ITEMS_PER_PAGE } from "@/src/lib/consts";
import type {
	GetAllProjectsActionResult,
	GetPaginatedAndFilteredProjectsActionResult,
	GetProjectsFirstLettersActionResult,
} from "./types";

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
		// Redirect to page 1 if page is out of bounds
		// TO-DO: TEST!!! This feels odd
		redirect(
			`?page=1${searchInput ? `&search=${searchInput}` : ""}${letterFilter ? `&letterFilter=${letterFilter}` : ""}`,
		);
	}

	return {
		projects,
		totalPages,
	};
}

export async function getProjectsFirstLettersAction(): GetProjectsFirstLettersActionResult {
	return fetchProjectsFirstLetters();
}

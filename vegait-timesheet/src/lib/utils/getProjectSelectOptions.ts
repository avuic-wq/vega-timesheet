import type { Project } from "@prisma/client";
import type { SelectOption } from "@/src/components/Shared/Form/types";

export const getProjectSelectOptions = (
	projects: Project[],
): SelectOption[] => {
	return projects.map((project) => ({
		label: project.name,
		value: project.id,
	}));
};

import type { Project } from "@prisma/client";
import type { SelectOption } from "@/src/components/Shared/Form/types";

export const getProjectSelectOptions = (
	industries: Project[],
): SelectOption[] => {
	return industries.map((industry) => ({
		label: industry.name,
		value: industry.id,
	}));
};

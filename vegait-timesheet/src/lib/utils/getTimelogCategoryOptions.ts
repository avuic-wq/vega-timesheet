import type { TimeLogCategory } from "@prisma/client";
import type { SelectOption } from "@/src/components/Shared/Form/types";

export const getIndustrySelectOptions = (
	categories: TimeLogCategory[],
): SelectOption[] => {
	return categories.map((category) => ({
		label: category.name,
		value: category.id,
	}));
};

import type { Industry } from "@prisma/client";
import type { SelectOption } from "@/src/components/Shared/Form/types";

export const getIndustrySelectOptions = (
	industries: Industry[],
): SelectOption[] => {
	return industries.map((industry) => ({
		label: industry.name,
		value: industry.id,
	}));
};

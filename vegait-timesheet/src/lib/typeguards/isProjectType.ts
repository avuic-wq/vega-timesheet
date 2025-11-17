import type { BaseItem, ProjectItem } from "@/src/components/List/types";

export const isProjectType = (item: BaseItem): item is ProjectItem => {
	return "countryCode" in item;
};

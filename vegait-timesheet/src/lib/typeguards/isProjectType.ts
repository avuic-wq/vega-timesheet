import type { BaseItem, ProjectItem } from "@/src/components/List/types";

export const isProjectType = (item: BaseItem): item is ProjectItem => {
	return "clientId" in item;
};

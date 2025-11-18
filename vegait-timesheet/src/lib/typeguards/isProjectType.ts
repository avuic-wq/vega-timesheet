import type { BaseItem, ProjectItem } from "@/src/components/Shared/List/types";

export const isProjectType = (item: BaseItem): item is ProjectItem => {
	return "clientId" in item;
};

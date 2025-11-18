import type { BaseItem, ClientItem } from "@/src/components/Shared/List/types";

export const isClientType = (item: BaseItem): item is ClientItem => {
	return "countryCode" in item;
};

import type { Client } from "@prisma/client";
import type { ListItem } from "@/src/components/List/ListItem";

export const isClientType = (item: ListItem): item is Client => {
	return "countryCode" in item;
};

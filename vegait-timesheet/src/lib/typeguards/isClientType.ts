import type { ListItem } from "@/src/components/List/ListItem";
import type { ClientType } from "@/src/lib/types";

export function isClientType(item: ListItem): item is ClientType {
	return item.__typename === "client";
}

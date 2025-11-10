import type { Client } from "@prisma/client";
import type { ListItem } from "@/src/components/List/ListItem";

// TO-DO: Refactor | Add __typename to the DB or inject it in actions/services ?
export function isClientType(item: ListItem): item is Client {
	return "countryCode" in item;
}

import type { ListItem } from "@/src/components/List/ListItem";
import type { ClientType } from "@/src/lib/types";

// TO-DO: Refactor | Add __typename to the DB or inject it in actions/services ?
export function isClientType(item: ListItem): item is ClientType {
	return "countryCode" in item;
}

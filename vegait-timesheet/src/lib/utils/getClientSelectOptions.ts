import type { Client } from "@prisma/client";
import type { SelectOption } from "@/src/components/Form/types";

export const getClientSelectOptions = (clients: Client[]): SelectOption[] => {
	return clients.map((client) => ({
		label: client.name,
		value: client.id,
	}));
};

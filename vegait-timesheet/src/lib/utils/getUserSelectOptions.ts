import type { User } from "@prisma/client";
import type { SelectOption } from "@/src/components/Shared/Form/types";

export const getUserSelectOptions = (users: User[]): SelectOption[] => {
	return users.map((user) => ({
		label: user.username,
		value: user.id,
	}));
};

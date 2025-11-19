import type { UserRole } from "@prisma/client";

export type UserFilters = {
	roles?: UserRole[];
};

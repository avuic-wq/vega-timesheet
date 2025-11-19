import type { User } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import type { UserFilters } from "@/src/db/UserService/types";

export async function findUserByUsername(
	username: string,
): Promise<User | null> {
	return prisma.user.findUnique({
		where: { username },
	});
}

export async function fetchAllUsers(filters?: UserFilters): Promise<User[]> {
	return prisma.user.findMany({
		where: {
			...(filters?.roles && {
				roles: {
					hasSome: filters.roles,
				},
			}),
		},
		orderBy: {
			lastName: "asc",
		},
	});
}

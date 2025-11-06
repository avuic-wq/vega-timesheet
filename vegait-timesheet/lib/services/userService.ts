import type { User, UserRole } from "@prisma/client";
import { prisma } from "@/prisma/prisma";

export async function findUserByUsername(
	username: string,
): Promise<User | null> {
	return prisma.user.findUnique({
		where: { username },
	});
}

export async function getAllUsers(filters?: {
	roles?: UserRole[];
}): Promise<User[]> {
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

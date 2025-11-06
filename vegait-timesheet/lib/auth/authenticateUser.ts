import { prisma } from "../prisma/prisma";

export const authenticateUser = async (username: string, password: string) => {
	const user = await prisma.user.findFirst({
		where: {
			username,
			password,
		},
		select: {
			id: true,
			username: true,
		},
	});

	return user || null;
};

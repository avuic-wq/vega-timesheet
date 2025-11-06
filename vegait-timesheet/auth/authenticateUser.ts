import { validatePassword } from "../lib/utils/validatePassword";
import { prisma } from "../prisma/prisma";

export const authenticateUser = async (username: string, password: string) => {
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
			username: true,
			password: true,
		},
	});

	if (!user) {
		return null;
	}

	return (await validatePassword(password, user.password)) ? user : null;
};

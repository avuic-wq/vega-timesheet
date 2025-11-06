import { prisma } from "../../prisma/prisma";
import { validatePassword } from "../validatePassword";

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

	return validatePassword(password, user.password);
};

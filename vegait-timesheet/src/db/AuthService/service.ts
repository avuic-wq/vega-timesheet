import type { User } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import type { RegisterFormData } from "@/src/components/Shared/Form/types";
import { DEFAULT_SALT_ROUNDS } from "@/src/lib/consts";
import { saltAndHashPassword } from "@/src/lib/utils/saltAndHashPassword";

export const register = async (
	data: RegisterFormData,
): Promise<User | null> => {
	const existingUser = await prisma.user.findUnique({
		where: { username: data.username },
	});

	if (existingUser) return null;

	const hashedPassword = await saltAndHashPassword(
		data.password,
		DEFAULT_SALT_ROUNDS,
	);

	const newUser = await prisma.user.create({
		data: {
			username: data.username,
			password: hashedPassword,
			firstName: data?.firstName,
			lastName: data?.lastName,
		},
	});

	return newUser;
};

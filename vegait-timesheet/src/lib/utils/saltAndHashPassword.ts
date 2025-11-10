import bcrypt from "bcryptjs";

export const saltAndHashPassword = async (
	password: string,
	saltRounds: number,
): Promise<string> => {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

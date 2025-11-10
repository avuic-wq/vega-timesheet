import bcrypt from "bcryptjs";

export const validatePassword = async (
	rawPassword: string,
	hashedPassword: string,
) => {
	return await bcrypt.compare(rawPassword, hashedPassword);
};

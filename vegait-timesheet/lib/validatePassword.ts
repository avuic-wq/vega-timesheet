import bcrypt from "bcryptjs";

export async function validatePassword(
	rawPassword: string,
	hashedPassword: string,
) {
	return await bcrypt.compare(rawPassword, hashedPassword);
}

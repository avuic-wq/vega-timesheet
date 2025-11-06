import bcrypt from "bcryptjs";

export async function saltAndHashPassword(
	password: string,
	saltRounds: number,
): Promise<string> {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}


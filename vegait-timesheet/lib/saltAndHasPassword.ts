import bcrypt from "bcryptjs";

export async function saltAndHashPassword(
	password: string,
	saltRounds: number,
): Promise<string> {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export async function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

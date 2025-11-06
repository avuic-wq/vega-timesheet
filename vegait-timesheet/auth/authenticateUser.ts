import { findUserByUsername } from "@/lib/services/userService";
import { validatePassword } from "@/lib/utils/validatePassword";

export const authenticateUser = async (username: string, password: string) => {
	const user = await findUserByUsername(username);

	if (!user) {
		return null;
	}

	const isValidPassword = await validatePassword(password, user.password);

	return isValidPassword ? user : null;
};

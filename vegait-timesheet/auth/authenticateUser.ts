import { findUserByUsername } from "@/src/lib/services/userService";
import { validatePassword } from "@/src/lib/utils/validatePassword";


// CHECK: is this valid function? In auth folder and calls prisma/db
export const authenticateUser = async (username: string, password: string) => {
	const user = await findUserByUsername(username);

	if (!user) {
		return null;
	}

	const isValidPassword = await validatePassword(password, user.password);

	return isValidPassword ? user : null;
};

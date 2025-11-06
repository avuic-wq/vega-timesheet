import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { authenticateUser } from "./authenticateUser";
import { saltAndHashPassword } from "../saltAndHasPassword";
import { signInSchema } from "../validators/zod";
import { DEFAULT_SALT_ROUNDS } from "../consts";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					const { username, password } = await signInSchema.parseAsync(credentials);

					const hashedPassword = await saltAndHashPassword(password, DEFAULT_SALT_ROUNDS);

					const user = await authenticateUser(username, hashedPassword);

					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
				}
				return null
			},
		}),
	],

});

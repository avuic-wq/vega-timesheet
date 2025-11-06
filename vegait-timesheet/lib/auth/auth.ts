import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "../validators/zod";
import { authenticateUser } from "./authenticateUser";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: {},
				password: {},
			},
			authorize: async (credentials) => {
				try {
					const { username, password } =
						await signInSchema.parseAsync(credentials);

					const user = await authenticateUser(username, password);
					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						return null;
					}
				}
				return null;
			},
		}),
	],
});

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/src/lib/validators/zod";

import { authenticateUser } from "./authenticateUser";

const oneHourInSeconds = 3600;

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: "jwt",
		maxAge: oneHourInSeconds,
	},
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

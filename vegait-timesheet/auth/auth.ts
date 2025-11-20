import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/src/lib/validators/Users/schemas";
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
		Auth0({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			issuer: process.env.AUTH0_ISSUER_BASE_URL,
		}),
	],
});

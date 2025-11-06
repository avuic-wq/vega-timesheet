import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@/app/generated/prisma/client";
import { getUser } from "./actions/auth";
import { saltAndHashPassword, verifyPassword } from "./saltAndHasPassword";

const credentialsSchema = z.object({
	username: z.string().min(1, "Username required"),
	password: z.string().min(1, "Password required"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				const validated = credentialsSchema.parse(credentials);
				let user: User | null = null;

				const pwHash = await saltAndHashPassword(validated.password);

				user = await getUser(validated.username, pwHash);

				if (!user) {
					throw new Error("Invalid credentials!");
				}

				const isPasswordValid = await verifyPassword(
					validated.password,
					user.password,
				);

				// TO:DO
				return user;
			},
		}),
	],
});

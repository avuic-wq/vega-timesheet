import z, { object } from "zod";

export const signInSchema = object({
	username: z.string().min(1, { message: "Username is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

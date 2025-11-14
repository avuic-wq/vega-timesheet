import z, { object } from "zod";

export const signInSchema = object({
	username: z.string().min(1, { message: "Username is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export const clientsParametersSchema = z.object({
	searchInput: z.string().optional(),
	letterFilter: z.string().optional(),
	currentPage: z.coerce
		.number()
		.int()
		.min(1)
		.default(1)
		.transform((val) => (Number.isNaN(val) || val < 1 ? 1 : val)),
});

export const projectsParametersSchema = z.object({
	searchInput: z.string().optional(),
	letterFilter: z.string().optional(),
	currentPage: z.coerce
		.number()
		.int()
		.min(1)
		.default(1)
		.transform((val) => (Number.isNaN(val) || val < 1 ? 1 : val)),
});

// TO-DO: Extract to separate functions

import { z } from "zod";

export const clientsModalSchema = z.object({
	name: z.string().min(1, "Name is required"),
	address: z.string().min(1, "Address is required"),
	countryCode: z.string().length(3, "Invalid country code"),
});

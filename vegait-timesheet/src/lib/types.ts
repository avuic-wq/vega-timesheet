export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	startsWith?: string;
	page?: string;
}>;

export type ButtonVariant = "primary" | "secondary" | "danger" | "custom";

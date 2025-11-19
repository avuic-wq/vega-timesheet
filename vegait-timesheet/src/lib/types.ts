export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	startsWith?: string;
	page?: string;
}>;

export type ButtonVariant = "primary" | "secondary" | "danger" | "custom";

export type QueryPageSettings = {
	page: number;
	itemsPerPage: number;
};

export type SearchParams = Promise<{
	callbackUrl?: string;
	search?: string;
	startsWith?: string;
	page?: string;
	fromDate?: string;
	toDate?: string;
	clientId?: string;
	projectId?: string;
	userId?: string;
	categoryId?: string;
	month?: string;
	year?: string;
}>;

export type ButtonVariant = "primary" | "secondary" | "danger" | "custom";

export type QueryPageSettings = {
	page: number;
	itemsPerPage: number;
};

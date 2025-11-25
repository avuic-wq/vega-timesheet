import type { TimeLog } from "@prisma/client";

export type FetchPaginatedAndFilteredTimelogsResult = Promise<{
	timeLogs: ReportsTimelog[];
	totalCount: number;
}>;

export type ReportsTimelog = TimeLog & {
	client: { name: string };
	project: { name: string };
	category: { name: string };
	user: { firstName: string; lastName: string };
};

export type TimesheetTimelog = TimeLog & {
	project: { name: string };
};

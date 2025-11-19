import type { TimeLog } from "@prisma/client";

export type FetchPaginatedAndFilteredTimelogsResult = Promise<{
	timeLogs: TimeLog[];
	totalCount: number;
}>;

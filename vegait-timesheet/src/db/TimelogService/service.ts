import type { Prisma } from "@prisma/client";
import { prisma } from "@/prisma/prisma";
import type { ReportFiltersData } from "@/src/components/Shared/Filter/types";
import type { FetchPaginatedAndFilteredTimelogsResult } from "@/src/db/TimelogService/types";
import type { QueryPageSettings } from "@/src/lib/types";

const include = {
	client: {
		select: { name: true },
	},
	project: {
		select: { name: true },
	},
	category: {
		select: { name: true },
	},
	user: {
		select: { firstName: true, lastName: true },
	},
};

export const fetchPaginatedAndFilteredTimelogs = async (
	pageSettings: QueryPageSettings,
	filters: ReportFiltersData,
): FetchPaginatedAndFilteredTimelogsResult => {
	const { page, itemsPerPage } = pageSettings;
	const conditions: Prisma.TimeLogWhereInput[] = [];

	if (filters.fromDate && filters.toDate) {
		conditions.push({
			date: {
				gte: new Date(filters.fromDate),
				lte: new Date(filters.toDate),
			},
		});
	}

	Object.entries(filters).forEach(([key, value]) => {
		if (!value || key === "fromDate" || key === "toDate") return;
		conditions.push({
			[key]: value,
		});
	});

	const where = conditions.length > 0 ? { AND: conditions } : {};

	const [timeLogs, totalCount] = await Promise.all([
		prisma.timeLog.findMany({
			where,
			include: include,
			orderBy: { date: "asc" },
			skip: (page - 1) * itemsPerPage,
			take: itemsPerPage,
		}),
		prisma.timeLog.count({ where }),
	]);
	console.log({ timeLogs });
	return { timeLogs, totalCount };
};

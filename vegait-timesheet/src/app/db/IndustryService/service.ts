import { prisma } from "@/prisma/prisma";
import type { FetchAllIndustriesResult } from "@/src/app/db/IndustryService/type";

export const fetchAllIndustries = (): FetchAllIndustriesResult => {
	return prisma.industry.findMany({
		orderBy: { name: "asc" },
	});
};

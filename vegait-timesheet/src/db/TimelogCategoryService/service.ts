import { prisma } from "@/prisma/prisma";

export const fetchAllTimelogCategories = () => {
	return prisma.timeLogCategory.findMany({
		orderBy: {
			name: "asc",
		},
	});
};

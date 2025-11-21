import { format } from "date-fns";
import type { ReportsTimelog } from "@/src/db/TimelogService/types";

export const mapDataToRows = (timelog: ReportsTimelog) => {
	return {
		date: format(timelog.date, "do MMMM yyyy"),
		clientName: timelog.client.name,
		projectName: timelog.project.name,
		categoryName: timelog.category?.name,
		employeeName: `${timelog.user.firstName} ${timelog.user.lastName}`,
		createdAt: format(timelog.createdAt, "do MMMM yyyy"),
	};
};

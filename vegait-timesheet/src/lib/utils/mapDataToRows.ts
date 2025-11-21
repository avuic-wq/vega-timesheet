import { format } from "date-fns";
import type { ReportRowData } from "@/src/components/Shared/Table/types";
import type { ReportsTimelog } from "@/src/db/TimelogService/types";
import { getDownloadCellContent } from "@/src/lib/utils/getDownloadCellContent";

export const mapDataToRows = (timelog: ReportsTimelog): ReportRowData => {
	return {
		date: format(timelog.date, "do MMMM yyyy"),
		clientName: timelog.client.name,
		projectName: timelog.project.name,
		categoryName: timelog.category?.name,
		employeeName: `${timelog.user.firstName} ${timelog.user.lastName}`,
		createdAt: format(timelog.createdAt, "do MMMM yyyy"),
		download: getDownloadCellContent(),
	};
};

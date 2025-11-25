import Table from "@/src/components/Shared/Table/Table";
import type { ReportRowData } from "@/src/components/Shared/Table/types";
import { reportsTableConfigFactory } from "@/src/lib/Factory/ReportsTable/reportsTableConfigFactory";

interface Props {
	rows: ReportRowData[];
	currentPage: number;
	totalPages: number;
}

const ReportsTable = async ({ rows, currentPage, totalPages }: Props) => {
	const tableConfig = reportsTableConfigFactory();

	return (
		<Table
			config={tableConfig}
			rowsData={rows}
			currentPage={currentPage}
			totalPages={totalPages}
		/>
	);
};

export default ReportsTable;

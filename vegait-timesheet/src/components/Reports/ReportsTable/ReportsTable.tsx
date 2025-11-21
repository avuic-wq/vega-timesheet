import Table from "@/src/components/Shared/Table/Table";
import type { ReportRowData } from "@/src/components/Shared/Table/types";
import { reportsTableConfigFactory } from "@/src/lib/Factory/ReportsTable/reportsTableConfigFactory";

interface Props {
	rows: ReportRowData[];
	totalPages: number;
}

const ReportsTable = async ({ rows }: Props) => {
	const tableConfig = reportsTableConfigFactory();

	return <Table config={tableConfig} rowsData={rows} />;
};

export default ReportsTable;

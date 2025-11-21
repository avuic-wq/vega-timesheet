import type { TableConfig } from "@/src/components/Shared/Table/types";
import { getDownloadCellContent } from "@/src/lib/utils/getDownloadCellContent";

export const reportsTableConfigFactory = (): TableConfig => {
	return {
		headers: [
			{
				header: "Date",
				accessorKey: "date",
			},
			{
				header: "Client",
				accessorKey: "clientName",
			},
			{
				header: "Project",
				accessorKey: "projectName",
			},
			{
				header: "Category",
				accessorKey: "categoryName",
			},
			{
				header: "Employee",
				accessorKey: "employeeName",
			},
			{
				header: "Created at",
				accessorKey: "createdAt",
			},
			{
				id: "download",
				cell: (row) => getDownloadCellContent(row),
			},
		],
	};
};

import type { TableConfig } from "@/src/components/Shared/Table/types";

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
				header: "",
				accessorKey: "download",
			},
		],
	};
};

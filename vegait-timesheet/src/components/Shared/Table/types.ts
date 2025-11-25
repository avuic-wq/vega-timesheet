import type { ReactNode } from "react";

type TableHeader = {
	header: string;
	accessorKey: string;
};

export type TableConfig = {
	headers: TableHeader[];
};

export type BaseRowData = {
	[key: string]: string | ReactNode;
};

export interface ReportRowData extends BaseRowData {
	date: string;
	clientName: string;
	projectName: string;
	categoryName: string;
	employeeName: string;
	createdAt: string;
}

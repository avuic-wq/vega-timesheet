import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export type TableConfig = {
	headers: ColumnDef<ReportRowData>[];
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

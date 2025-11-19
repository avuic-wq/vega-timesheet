import type { SelectOption } from "@/src/components/Shared/Form/types";
import type { IconName } from "@/src/components/Shared/Icon/Icon";

export type FilterValue = string;

export interface BaseFilter {
	name: string;
	placeholder: string;
}

export interface SelectFilter extends BaseFilter {
	type: "select";
	options: SelectOption[];
}

export interface DateFilter extends BaseFilter {
	type: "date";
	rightIcon?: IconName;
}

export interface BaseFilterData {
	[key: string]: FilterValue;
}

export interface ReportFiltersData extends BaseFilterData {
	fromDate: string;
	toDate: string;
	clientId: string;
	categoryId: string;
	projectId: string;
	userId: string;
}

export type Filter = SelectFilter | DateFilter;

export type FiltersConfig = { filters: Filter[] };

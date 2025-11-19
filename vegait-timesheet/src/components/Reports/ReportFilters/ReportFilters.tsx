"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Filters from "@/src/components/Shared/Filter/Filters";
import type { ReportFiltersData } from "@/src/components/Shared/Filter/types";
import type { SelectOption } from "@/src/components/Shared/Form/types";
import { reportFiltersConfigFactory } from "@/src/lib/Factory/reportFiltersConfigFactory";

interface Props {
	clientOptions: SelectOption[];
	projectOptions: SelectOption[];
	categoryOptions: SelectOption[];
	userOptions: SelectOption[];
}

const ReportFilters = ({
	clientOptions,
	projectOptions,
	categoryOptions,
	userOptions,
}: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filtersConfig = reportFiltersConfigFactory({
		clientOptions,
		projectOptions,
		categoryOptions,
		userOptions,
	});

	const handleGenerateFilters = (filtersData: ReportFiltersData) => {
		const params = new URLSearchParams(searchParams);
		const noFiltersApplied =
			!Object.values(filtersData).filter(Boolean)?.length;

		if (noFiltersApplied) return;

		Object.entries(filtersData).forEach(([key, value]) => {
			if (
				!value ||
				// TO-DO: !SEARCH_PARAMETERS[key.toUpperCase()] (safety)
				typeof value !== "string"
			) {
				return;
			}
			params.set(key, String(value));
		});

		router.push(`?${params.toString()}`, { scroll: false });
	};

	const handleResetFilters = (filtersData: ReportFiltersData) => {
		const params = new URLSearchParams(searchParams);

		Object.entries(filtersData).forEach(([key, value]) => {
			if (key && value) {
				params.delete(key, String(value));
			}
		});
		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<Filters
			config={filtersConfig}
			onSubmit={handleGenerateFilters}
			onReset={handleResetFilters}
		/>
	);
};

export default ReportFilters;

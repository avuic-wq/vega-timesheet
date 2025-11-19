"use client";

import { useCallback, useState } from "react";
import Button from "@/src/components/Shared/Button/Button";
import Filter from "@/src/components/Shared/Filter/Filter";
import type {
	BaseFilterData,
	FiltersConfig,
	FilterValue,
} from "@/src/components/Shared/Filter/types";
import Text from "@/src/components/Shared/Text/Text";

interface Props<T extends BaseFilterData> {
	config: FiltersConfig;
	onSubmit: (filtersData: T) => void;
	onReset: (filtersData: T) => void;
	initialValues?: T;
}

const Filters = <T extends BaseFilterData>({
	config,
	onSubmit,
	onReset,
	initialValues,
}: Props<T>) => {
	const [filterValues, setFilterValues] = useState<T>(
		initialValues || ({} as T),
	);

	const handleOnChangeFilter = useCallback(
		(fieldName: string, value: FilterValue) => {
			setFilterValues((prev) => ({ ...prev, [fieldName]: value }));
		},
		[],
	);

	const handleOnSubmit = useCallback(() => {
		onSubmit(filterValues);
	}, [onSubmit, filterValues]);

	const handleOnReset = useCallback(() => {
		onReset(filterValues);
		setFilterValues({} as T);
	}, [onReset, filterValues]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleOnSubmit();
			}}
			className="flex flex-col gap-7"
		>
			<div className="grid grid-cols-3 gap-4">
				{config.filters.map((filter) => {
					return (
						<Filter
							key={filter.name}
							filter={filter}
							filterValues={filterValues}
							onChange={handleOnChangeFilter}
						/>
					);
				})}
			</div>

			<div className="flex flex-col align-start w-1/6">
				<Button
					key="Generate"
					type="submit"
					variant="primary"
					className="px-15"
				>
					<Text value="Generate" />
				</Button>

				<Button
					key="reset"
					type="button"
					variant="secondary"
					onClick={handleOnReset}
				>
					<Text value="Reset" />
				</Button>
			</div>
		</form>
	);
};

export default Filters;

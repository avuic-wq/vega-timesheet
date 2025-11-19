import DateField from "@/src/components/Shared/DateField/DateField";
import type {
	BaseFilterData,
	Filter as FilterType,
	FilterValue,
} from "@/src/components/Shared/Filter/types";
import SelectField from "@/src/components/Shared/SelectField/SelectField";

type Props<T extends BaseFilterData> = {
	filter: FilterType;
	filterValues: T;
	onChange: (fieldName: string, value: FilterValue) => void;
};

const Filter = <T extends BaseFilterData>({
	filter,
	filterValues,
	onChange,
}: Props<T>) => {
	const isDateType = filter.type === "date";

	if (isDateType) {
		return (
			<DateField
				key={filter.name}
				name={filter.name}
				placeholder={filter.placeholder}
				value={filterValues[filter.name]}
				onChange={onChange}
				rightIcon={isDateType ? "calendar" : undefined}
			/>
		);
	}

	return (
		<SelectField
			key={filter.name}
			name={filter.name}
			placeholder={filter.placeholder}
			value={filterValues[filter.name]}
			options={isDateType ? [] : filter.options}
			onChange={onChange}
		/>
	);
};

export default Filter;

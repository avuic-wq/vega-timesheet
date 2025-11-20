import type { FiltersConfig } from "@/src/components/Shared/Filter/types";
import type { SelectOption } from "@/src/components/Shared/Form/types";

interface Props {
	clientOptions: SelectOption[];
	projectOptions: SelectOption[];
	categoryOptions: SelectOption[];
	userOptions: SelectOption[];
}

export const reportFiltersConfigFactory = ({
	clientOptions,
	projectOptions,
	categoryOptions,
	userOptions,
}: Props): FiltersConfig => ({
	filters: [
		{
			type: "date",
			name: "fromDate",
			placeholder: "From date",
			rightIcon: "calendar",
		},
		{
			type: "select",
			name: "clientId",
			placeholder: "Client",
			options: clientOptions,
		},
		{
			type: "select",
			name: "categoryId",
			placeholder: "Category",
			options: categoryOptions,
		},
		{
			type: "date",
			name: "toDate",
			placeholder: "To date",
			rightIcon: "calendar",
		},
		{
			type: "select",
			name: "projectId",
			placeholder: "Project",
			options: projectOptions,
		},
		{
			type: "select",
			name: "userId",
			placeholder: "Employee",
			options: userOptions,
		},
	],
	buttonText: {
		submit: "Generate",
		reset: "Reset",
	},
});

import type {
	EntityFormMode,
	FormConfig,
	SelectOption,
} from "@/src/components/Shared/Form/types";

type Props = {
	mode: EntityFormMode;
	countryOptions: SelectOption[];
};

export const clientFormConfigFactory = ({
	mode,
	countryOptions,
}: Props): FormConfig => ({
	fields: [
		{
			type: "text",
			name: "name",
			placeholder: "Name",
			isRequired: true,
		},
		{
			type: "text",
			name: "address",
			placeholder: "Address",
			isRequired: true,
		},
		{
			type: "select",
			name: "countryCode",
			placeholder: "Country",
			isRequired: true,
			options: countryOptions,
		},
	],
	buttonText: {
		submit: mode === "create" ? "Create" : "Save",
		delete: mode === "edit" ? "Delete" : undefined,
	},
});

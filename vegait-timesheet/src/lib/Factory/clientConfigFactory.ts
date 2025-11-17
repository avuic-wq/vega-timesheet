import type {
	FormConfig,
	FormMode,
	SelectOption,
} from "@/src/components/Form/types";

type Props = {
	mode: FormMode;
	countryOptions: SelectOption[];
};

export const clientConfigFactory = ({
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

import type {
	FormConfig,
	FormMode,
	SelectOption,
} from "@/src/components/Form/types";

type Props = {
	mode: FormMode;
	clientOptions: SelectOption[];
	industryOptions: SelectOption[];
};

export const projectFormConfigFactory = ({
	mode,
	clientOptions,
	industryOptions,
}: Props): FormConfig => ({
	fields: [
		{
			type: "text",
			name: "name",
			placeholder: "Name",
			isRequired: true,
		},
		{
			type: "select",
			name: "clientId",
			placeholder: "Client",
			isRequired: true,
			options: clientOptions,
		},
		{
			type: "select",
			name: "industryId",
			placeholder: "Industry",
			isRequired: true,
			options: industryOptions,
		},
	],
	buttonText: {
		submit: mode === "create" ? "Create" : "Save",
		delete: mode === "edit" ? "Delete" : undefined,
	},
});

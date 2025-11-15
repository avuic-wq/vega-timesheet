import Text from "@/src/components/Text";
import FormField from "./FormField";
import type { FormConfig, FormValues } from "./types";

interface Props {
	config: FormConfig;
	formValues: FormValues;
	onFormValuesChange: (values: FormValues) => void;
}

const FormFields = ({ config, formValues, onFormValuesChange }: Props) => {
	return (
		<>
			{config?.fields?.map((fieldConfig) => {
				return (
					<div key={fieldConfig.name} className="flex justify-between">
						<div className="w-full">
							{
								<FormField
									config={fieldConfig}
									formValues={formValues}
									onChange={onFormValuesChange}
								/>
							}
						</div>
						<div className="min-w-3">
							{fieldConfig.isRequired && (
								<Text value="*" className="ml-1 font-bold text-red" />
							)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default FormFields;

import type { JSX } from "react";
import type {
	BaseFormData,
	FieldValue,
	FormField as FormFieldType,
} from "@/src/components/Form/types";
import SelectField from "@/src/components/SelectField/SelectField";
import TextField from "@/src/components/TextField/TextField";

const defaultContainerStyle = "flex items-center px-6 py-3";

interface Props<T extends BaseFormData> {
	field: FormFieldType;
	formValues: T;
	onChange: (fieldName: string, value: FieldValue) => void;
}

export const FormField = <T extends BaseFormData>({
	field,
	formValues,
	onChange,
}: Props<T>): JSX.Element | null => {
	if (field.type === "text" || field.type === "password") {
		const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(field.name, e.target.value);
		};

		return (
			<TextField
				key={field.name}
				name={field.name}
				placeholder={field.placeholder}
				value={formValues[field.name]}
				onChange={handleOnChange}
			/>
		);
	}

	if (field.type === "select") {
		const handleOnChange = (e: React.MouseEvent<HTMLButtonElement>) => {
			onChange(field.name, e.currentTarget.value);
		};

		return (
			<SelectField
				key={field.name}
				name={field.name}
				placeholder={field.placeholder}
				value={formValues[field.name]}
				options={field.options}
				onChange={handleOnChange}
			/>
		);
	}

	return null;
};

export default FormField;

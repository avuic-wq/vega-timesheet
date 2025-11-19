import type { JSX } from "react";
import DateField from "@/src/components/Shared/DateField/DateField";
import type {
	BaseFormData,
	FieldValue,
	FormField as FormFieldType,
} from "@/src/components/Shared/Form/types";
import SelectField from "@/src/components/Shared/SelectField/SelectField";
import TextField from "@/src/components/Shared/TextField/TextField";

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
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(field.name, e.target.value);
	};

	if (field.type === "text" || field.type === "password") {
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
		return (
			<SelectField
				key={field.name}
				name={field.name}
				placeholder={field.placeholder}
				value={formValues[field.name]}
				options={field.options}
				onChange={onChange}
			/>
		);
	}

	if (field.type === "date") {
		return (
			<DateField
				key={field.name}
				name={field.name}
				placeholder={field.placeholder}
				value={formValues[field.name]}
				onChange={onChange}
				rightIcon="calendar"
			/>
		);
	}

	return null;
};

export default FormField;

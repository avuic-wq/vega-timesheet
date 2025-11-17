import type { JSX } from "react";
import type {
	BaseFormData,
	FieldValue,
	FormField as FormFieldType,
} from "@/src/components/Form/types";
import SelectField from "@/src/components/SelectField/SelectField";

const defaultContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6 py-3";
const defaultTextfieldStyle = "w-full h-full outline-none";

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
	if (field.type === "text") {
		return (
			<div className={defaultContainerStyle}>
				{/* // TO-DO: Change to <TextField when text field is refactored (defaultValue) */}
				<input
					key={field.name}
					type="text"
					autoComplete="off"
					spellCheck="false"
					name={field.name}
					placeholder={field.placeholder}
					value={formValues[field.name]}
					onChange={(e) => onChange(field.name, e.target.value)}
					className={defaultTextfieldStyle}
				/>
				{/* <TextField
					key={field.name}
					name={field.name}
					placeholder={field.placeholder}
					defaultValue={field.value}
					className={defaultTextfieldStyle}
				/> */}
			</div>
		);
	}

	if (field.type === "select") {
		return (
			<div className={defaultContainerStyle}>
				<SelectField
					name={field.name}
					value={formValues[field.name]}
					options={field.options}
					onChange={onChange}
				/>
			</div>
		);
	}

	return null;
};

export default FormField;

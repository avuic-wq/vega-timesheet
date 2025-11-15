import { getCountryData, type TCountryCode } from "countries-list";
import type { ChangeEvent, JSX } from "react";
import type {
	FormField as FormFieldType,
	FormValues,
	SelectableOption,
} from "@/src/components/EditForm/types";
import SelectField from "../SelectField/SelectField";

const defaultContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6 py-3";
const defaultTextfieldStyle = "w-full h-full outline-none";

interface Props {
	config: FormFieldType;
	formValues: FormValues;
	onChange: (values: FormValues) => void;
}

const FormField = ({
	config,
	formValues,
	onChange,
}: Props): JSX.Element | null => {
	if (config.type === "text") {
		const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
			const fieldName = e.target?.name;
			const fieldValue = e.target?.value;

			onChange({
				...formValues,
				[fieldName]: fieldValue,
			});
		};

		return (
			<div className={defaultContainerStyle}>
				{/* // TO-DO: Change to <TextField when text field is refactored (defaultValue) */}
				<input
					key={config.name}
					type="text"
					autoComplete="off"
					spellCheck="false"
					name={config.name}
					placeholder={config.placeholder}
					value={formValues?.[config.name]}
					onChange={handleTextFieldChange}
					className={defaultTextfieldStyle}
				/>
			</div>
		);
	}

	if (config.type === "select") {
		const handleSelectFieldChange = (
			fieldName: string,
			option: SelectableOption,
		) => {
			onChange({
				...formValues,
				[fieldName]: option?.value,
			});
		};

		const selectedOption = {
			label:
				getCountryData(formValues[config.name] as TCountryCode)?.name || "",
			value: formValues[config.name] || "",
		};
		return (
			<div className={defaultContainerStyle}>
				<SelectField
					name={config.name}
					options={config.options}
					value={selectedOption}
					onChange={handleSelectFieldChange}
				/>
			</div>
		);
	}

	return null;
};

export default FormField;

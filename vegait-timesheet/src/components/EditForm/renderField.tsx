import type { JSX } from "react";
import type { FormField } from "@/src/components/EditForm/types";
import SelectField from "@/src/components/SelectField/SelectField";

const defaultContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6 py-3";
const defaultTextfieldStyle = "w-full h-full outline-none";

export const renderField = (field: FormField): JSX.Element | null => {
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
					defaultValue={field.initialValue}
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
					initialSelectedOption={field.initialValue}
					options={field.options}
				/>
			</div>
		);
	}

	return null;
};

import type { JSX } from "react";
import type { FormField } from "./types";

const defaultContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6";
const defaultInputStyle = "py-3 w-full outline-none";

export const renderField = (field: FormField): JSX.Element | null => {
	if (field.type === "text") {
		return (
			<div key={field.name} className={defaultContainerStyle}>
				{/* // TO-DO: Change to <TextField when text field is refactored */}
				<input
					key={field.name}
					type="text"
					autoComplete="off" // TO-DO: Try to disable name/address/etc suggestions
					name={field.name}
					placeholder={field.placeholder}
					defaultValue={field.value}
					className={defaultInputStyle}
				/>
			</div>
		);
	}

	if (field.type === "dropdown") {
		return (
			<div key={field.name} className={defaultContainerStyle}>
				{/* // TO-DO: Change to <DropdownField when text field is refactored */}
				<select key={field.name} name={field.name} defaultValue={field.value}>
					<option value="">{field.placeholder}</option>

					{field.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		);
	}

	return null;
};

"use client";

import { useEffect, useRef, useState } from "react";
import type {
	FieldValue,
	SelectOption,
} from "@/src/components/Shared/Form/types";
import Icon from "@/src/components/Shared/Icon/Icon";
import OptionsDropdown from "@/src/components/Shared/SelectField/OptionsDropdown";

const inputContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-3xl focus-within:border-black px-6";

interface Props {
	name: string;
	placeholder?: string;
	value?: string;
	options: SelectOption[];
	onChange: (fieldName: string, value: FieldValue) => void;
}

// TO-DO: Lazy load if a dropdown list is big
// TO-DO: Fix bug where dropdown width decreases when searching (e.g: "Serb")
const SelectField = ({
	name,
	placeholder,
	value,
	options,
	onChange,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [searchText, setSearchText] = useState("");

	const selectedOption = options.find((option) => option.value === value);

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchText.toLowerCase()),
	);

	const handleOnDropdownClose = () => {
		setSearchText("");
		setIsDropdownVisible(false);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsDropdownVisible(false);
				setSearchText("");
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const inputStyle = `w-full h-full outline-none py-3 pr-8 ${selectedOption?.label ? "placeholder:text-black" : ""}`;

	return (
		<div ref={ref} className="relative w-full">
			<div className={inputContainerStyle}>
				<input
					ref={inputRef}
					type="text"
					value={!isDropdownVisible ? selectedOption?.label || "" : searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
						setIsDropdownVisible(true);
					}}
					onFocus={() => {
						setIsDropdownVisible(true);
						setSearchText("");
					}}
					placeholder={selectedOption?.label || placeholder}
					className={inputStyle}
				/>
				<Icon
					name="chevron-down"
					style={{
						position: "absolute",
						pointerEvents: "none",
						right: "29px",
						top: "25px",
						transform: "translateY(-50%)",
					}}
				/>
			</div>

			{isDropdownVisible && (
				<OptionsDropdown
					name={name}
					selectedOption={selectedOption}
					options={filteredOptions}
					onChange={onChange}
					onClose={handleOnDropdownClose}
				/>
			)}
		</div>
	);
};

export default SelectField;

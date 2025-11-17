"use client";

import { getCountryData, type TCountryCode } from "countries-list";
import { useEffect, useRef, useState } from "react";
import type { FieldValue, SelectOption } from "@/src/components/Form/types";
import Icon from "@/src/components/Icon/Icon";
import Text from "@/src/components/Text/Text";

const inputContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6";
const resultsDropdownStyle =
	"absolute z-50 left-[14px] rounded-[10px] bg-white border-[1.5px] border-grey-200 shadow-lg max-h-60 overflow-y-auto";
const noResultDropdownStyle =
	"absolute z-50 mt-1 w-full rounded-[24px] bg-white border-[1.5px] border-grey-200 shadow-lg px-3 py-2 text-gray-400";

interface Props {
	name: string;
	value?: string;
	options: SelectOption[];
	onChange: (fieldName: string, value: FieldValue) => void;
}

const SelectField = ({ name, value, options, onChange }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [searchText, setSearchText] = useState("");

	const countryFullName = value
		? getCountryData(value as TCountryCode)?.name
		: "";

	const selectedOption = { label: countryFullName, value };

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchText.toLowerCase()),
	);

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
					value={!isDropdownVisible ? selectedOption?.label : searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
						setIsDropdownVisible(true);
					}}
					onFocus={() => {
						setIsDropdownVisible(true);
						setSearchText("");
					}}
					placeholder={selectedOption?.label || "Country"}
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

			{isDropdownVisible && filteredOptions.length > 0 && (
				<div className={resultsDropdownStyle}>
					{filteredOptions.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => {
								onChange(name, option.value);
								setIsDropdownVisible(false);
								setSearchText("");
							}}
							className={`w-full text-left px-3 py-2 cursor-pointer hover:bg-gray-100 ${
								option.value === selectedOption.value
									? "bg-blue-50 font-medium"
									: ""
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}

			{isDropdownVisible && filteredOptions.length === 0 && (
				<div className={noResultDropdownStyle}>
					<Text value={"No options found"} />
				</div>
			)}
		</div>
	);
};

export default SelectField;

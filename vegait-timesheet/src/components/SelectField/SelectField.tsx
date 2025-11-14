"use client";

import { useEffect, useRef, useState } from "react";
import type { SelectableOption } from "@/src/components/EditForm/types";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";

const resultsDropdownStyle =
	"absolute left-[1px] z-50 w-full mt-2 bg-white border-[1.5px] border-grey-200 shadow-lg max-h-60 overflow-y-auto";
const noResultDropdownStyle =
	"absolute s z-50 w-full mt-2 bg-white border-[1.5px] border-grey-200 shadow-lg px-3 py-2 text-gray-400";
interface Props {
	name: string;
	initialSelectedOption?: SelectableOption;
	options: SelectableOption[];
}

const SelectField = ({ name, initialSelectedOption, options }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState<SelectableOption>({
		label: initialSelectedOption?.label || "",
		value: initialSelectedOption?.value || "",
	});
	const [searchText, setSearchText] = useState("");

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

	return (
		<div ref={ref} className="relative w-full">
			<input type="hidden" name={name} value={selectedOption?.value} />
			<div className="max-h-[22px] relative">
				<input
					ref={inputRef}
					type="text"
					onChange={(e) => {
						setSearchText(e.target.value);
						setIsDropdownVisible(true);
					}}
					onFocus={() => {
						setIsDropdownVisible(true);
						setSearchText("");
					}}
					placeholder={selectedOption?.label}
					className="w-full max-h-[22px] border-none focus:outline-none placeholder:text-black"
				/>
				<Icon
					name="chevron-down"
					style={{
						position: "absolute",
						pointerEvents: "none",
						right: "12px",
						top: "50%",
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
								setSelectedOption(option);
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

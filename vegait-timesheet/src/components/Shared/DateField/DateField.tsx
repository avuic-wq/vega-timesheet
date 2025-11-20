"use client";

import { useEffect, useRef, useState } from "react";
import OptionsDropdown from "@/src/components/Shared/DateField/OptionsDropdown";
import type { FieldValue } from "@/src/components/Shared/Form/types";
import Icon, { type IconName } from "@/src/components/Shared/Icon/Icon";

const inputContainerStyle =
	"flex items-center border-2 border-grey-500 rounded-3xl focus-within:border-black px-6";

interface Props {
	name: string;
	placeholder?: string;
	value?: string;
	onChange: (fieldName: string, value: FieldValue) => void;
	rightIcon?: IconName;
}

const DateField = ({
	name,
	placeholder,
	value,
	onChange,
	rightIcon,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const handleOnDropdownClose = () => {
		setIsDropdownVisible(false);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsDropdownVisible(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const inputStyle = `w-full h-full outline-none py-3 pr-8 ${value ? "placeholder:text-black" : ""}`;

	return (
		<div ref={ref} className="relative w-full">
			<div className={inputContainerStyle}>
				<input
					ref={inputRef}
					type="text"
					onChange={(e) => {
						setIsDropdownVisible(true);
					}}
					onFocus={() => {
						setIsDropdownVisible(true);
					}}
					placeholder={value || placeholder}
					className={inputStyle}
				/>
				<Icon
					name={rightIcon ? rightIcon : "chevron-down"}
					style={{
						position: "absolute",
						pointerEvents: "none",
						right: "29px",
						top: "14px",
						opacity: isDropdownVisible ? 1 : 0.5,
					}}
				/>
			</div>

			{isDropdownVisible && (
				<OptionsDropdown
					name={name}
					value={value}
					onChange={onChange}
					onClose={handleOnDropdownClose}
				/>
			)}
		</div>
	);
};

export default DateField;

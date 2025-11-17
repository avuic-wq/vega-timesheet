"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/src/components/Icon";

interface Props {
	name: string;
	placeholder: string;
	isDisabled?: boolean;
	error?: string;
	rightIcon?: IconName;
	leftIcon?: IconName;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const staticStyles = "py-3 w-full outline-none";

const getDynamicStyles = (hasRightIcon: boolean, hasLeftIcon: boolean) => {
	if (hasLeftIcon && hasRightIcon) {
		return `px-3`;
	}

	if (hasRightIcon) {
		return `pr-3`;
	}

	if (hasLeftIcon) {
		return `pl-3`;
	}

	return ``;
};

const TextField = ({
	name,
	placeholder,
	isDisabled = false,
	error,
	rightIcon,
	leftIcon,
	onChange,
}: Props) => {
	const [isFocused, setIsFocused] = useState(false);
	const isPasswordField = name === "password"
	const [showPassword, setShowPassword] = useState(!isPasswordField);
	const dynamicStyles = getDynamicStyles(
		!!rightIcon || !!isPasswordField,
		!!leftIcon,
	);

	return (
		<div className="flex flex-col">
			<div className="flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6">
				{!isPasswordField && leftIcon && (
					<Icon name={leftIcon} style={{ opacity: isFocused ? 1 : 0.5 }} />
				)}

				<input
					id={name}
					type={showPassword ? "text" : "password"}
					name={name}
					placeholder={placeholder}
					className={`${staticStyles} ${dynamicStyles}`}
					autoComplete="off"
					spellCheck="false"
					onChange={(e) => onChange?.(e)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					disabled={isDisabled}
				/>

				{isPasswordField && (
					<Icon
						onClick={() => setShowPassword(!showPassword)}
						name={showPassword ? "eye" : "eye-off"}
						style={{ opacity: isFocused && !isDisabled ? 1 : 0.5 }}
					/>
				)}

				{!isPasswordField && rightIcon && (
					<Icon name={rightIcon} style={{ opacity: isFocused ? 1 : 0.5 }} />
				)}
			</div>
			{error && <p className="text-red text-sm">{error}</p>}
		</div>
	);
};

export default TextField;

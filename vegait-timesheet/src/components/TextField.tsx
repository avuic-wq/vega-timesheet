"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/src/components/Icon";

interface Props {
	name: string;
	placeholder: string;
	isDisabled?: boolean;
	error?: string;
	isPassword?: boolean;
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
	isPassword = false,
	rightIcon,
	leftIcon,
	onChange,
}: Props) => {
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(!isPassword);
	const dynamicStyles = getDynamicStyles(
		!!rightIcon || !!isPassword,
		!!leftIcon,
	);

	return (
		<div className="flex flex-col">
			<div className="flex items-center border-2 border-grey-500 rounded-[24px] focus-within:border-black px-6">
				{leftIcon && <Icon name={leftIcon} fullOpacity={isFocused} />}
				<input
					id={name}
					type={showPassword ? "text" : "password"}
					name={name}
					placeholder={placeholder}
					className={`${staticStyles} ${dynamicStyles}`}
					autoComplete="off"
					onChange={(e) => onChange?.(e)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					disabled={isDisabled}
				/>
				{isPassword && (
					<Icon
						onClick={() => setShowPassword(!showPassword)}
						name={showPassword ? "eye" : "eye-off"}
						fullOpacity={isFocused && !isDisabled}
					/>
				)}
				{!isPassword && rightIcon && (
					<Icon name={rightIcon} fullOpacity={isFocused} />
				)}
			</div>
			{error && <p className="text-red text-sm">{error}</p>}
		</div>
	);
};

export default TextField;

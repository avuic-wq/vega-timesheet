"use client";

import { useState } from "react";
import Icon, { type IconName } from "@/src/components/Icon";

interface Props {
	name: string;
	placeholder: string;
	error?: string;
	isPassword?: boolean;
	rightIcon?: IconName;
	leftIcon?: IconName;
	isDisabled?: boolean;
}

const staticStyles = "py-3 pr-3 w-full outline-none";

export default function TextField({
	name,
	placeholder,
	error,
	isPassword = false,
	rightIcon,
	leftIcon,
	isDisabled = false,
}: Props) {
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(!isPassword);

	return (
		<div className="flex flex-col">
			<div className="flex items-center border-[2px] border-grey-500 rounded-[24px] focus-within:border-black px-6">
				{leftIcon && <Icon name={leftIcon} fullOpacity={isFocused} />}
				<input
					id={name}
					type={showPassword ? "text" : "password"}
					name={name}
					placeholder={placeholder}
					className={staticStyles}
					autoComplete="off"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					disabled={isDisabled}
				/>
				{isPassword && (
					<Icon
						onClick={() => setShowPassword(!showPassword)}
						name={showPassword ? "eye-off" : "eye"}
						fullOpacity={isFocused && !isDisabled}
					/>
				)}
				{!isPassword && rightIcon && (
					<Icon name={rightIcon} fullOpacity={isFocused && !isDisabled} />
				)}
			</div>
			{error && <p className="text-red text-sm">{error}</p>}
		</div>
	);
}

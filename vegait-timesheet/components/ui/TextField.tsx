"use client";

import { useState } from "react";
import { Icon, type IconName } from "../Icon";

interface Props {
	name: string;
	placeholder: string;
	error?: string;
	isPassword?: boolean;
	rightIcon?: IconName;
	leftIcon?: IconName;
	isDisabled?: boolean;
}

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
		<div className="w-[340px] h-[74px] flex flex-col">
			<div className="border-[2px] border-grey-500 rounded-[24px] focus-within:border-black flex items-center px-[24px]">
				{leftIcon && <Icon name={leftIcon} fullOpacity={isFocused} />}
				<input
					id={name}
					type={showPassword ? "text" : "password"}
					name={name}
					placeholder={placeholder}
					className="pt-[12px] pb-[12px] pr-[24px] w-full outline-none"
					autoComplete="off"
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					disabled={isDisabled}
				/>
				{isPassword && (
					<button type="button" onClick={() => setShowPassword(!showPassword)}>
						<Icon
							name={showPassword ? "eye-off" : "eye"}
							fullOpacity={isFocused && !isDisabled}
						/>
					</button>
				)}
				{!isPassword && rightIcon && (
					<Icon name={rightIcon} fullOpacity={isFocused && !isDisabled} />
				)}
			</div>
			{error && <p className="text-red text-sm">{error}</p>}
		</div>
	);
}

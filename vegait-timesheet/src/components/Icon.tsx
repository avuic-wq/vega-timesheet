"use client";

import Image from "next/image";

export type IconName =
	| "calendar"
	| "check"
	| "chevron-down"
	| "chevron-left"
	| "chevron-right"
	| "close"
	| "download"
	| "eye-off"
	| "eye"
	| "menu"
	| "plus"
	| "search";

export interface IconProps {
	name: IconName;
	size?: number;
	alt?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	fullOpacity?: boolean;
}

export default function Icon({
	name,
	size = 24,
	alt,
	onClick,
	fullOpacity = true,
}: IconProps) {
	// TO-DO: Use another approach to avoid <Image ?
	return (
		<Image
			src={`/icons/${name}.svg`}
			alt={alt || `${name} icon`}
			width={size}
			height={size}
			style={{
				opacity: fullOpacity ? 1 : 0.5,
				cursor: onClick ? "pointer" : "",
			}}
			onClick={onClick}
		/>
	);
}

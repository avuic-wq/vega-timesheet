"use client"
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
	fullOpacity?: boolean;
}

export function Icon({ name, size = 24, alt, fullOpacity = false }: IconProps) {
	return (
		<Image
			src={`/icons/${name}.svg`}
			alt={alt || `${name} icon`}
			width={size}
			height={size}
			style={{ opacity: fullOpacity ? 1 : 0.5 }}
		/>
	);
}

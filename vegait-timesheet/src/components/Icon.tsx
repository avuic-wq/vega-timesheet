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
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	fullOpacity?: boolean;
}

export default function Icon({
	name,
	size = 24,
	alt,
	onClick,
	fullOpacity = true,
}: IconProps) {
	return (
		<button type="button" onClick={onClick}>
			<Image
				src={`/icons/${name}.svg`}
				alt={alt || `${name} icon`}
				width={size}
				height={size}
				style={{
					opacity: fullOpacity ? 1 : 0.5,
					cursor: onClick ? "pointer" : "",
				}}
			/>
		</button>
	);
}

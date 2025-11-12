"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

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
	style?: CSSProperties; // Done since <Image tag isn't accepting Tailwind classes
}

const Icon = ({ name, size = 24, alt, onClick, style }: IconProps) => {
	// TO-DO: Use another approach to avoid <Image ?
	console.log({
		final: {
			...style,
			cursor: onClick ? "pointer" : "",
		},
	});
	return (
		<Image
			src={`/icons/${name}.svg`}
			alt={alt || `${name} icon`}
			width={size}
			height={size}
			style={{
				...style,
				cursor: onClick ? "pointer" : "",
			}}
			onClick={onClick}
		/>
	);
};

export default Icon;

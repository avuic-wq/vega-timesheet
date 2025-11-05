import Image from "next/image";

export type LogoSize = "sm" | "md";

interface LogoProps {
	size?: LogoSize;
	spacing?: { top?: number; right?: number; bottom?: number; left?: number };
}

const logoConfig = {
	sm: {
		width: 100,
		height: 25,
		src: "/logos/logoSM.png",
	},
	md: {
		width: 184,
		height: 45,
		src: "/logos/logoMd.png",
	},
};

export function Logo({ size = "md", spacing }: LogoProps) {
	const config = logoConfig[size];

	const logoSpacing = {
		marginLeft: spacing?.left ?? 0,
		marginRight: spacing?.right ?? 0,
		marginTop: spacing?.top ?? 0,
		marginBottom: spacing?.bottom ?? 0,
	};

	return (
		<div style={logoSpacing}>
			<Image
				src={config.src}
				alt="logo"
				width={config.width}
				height={config.height}
				priority
			/>
		</div>
	);
}

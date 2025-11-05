import Image from "next/image";

export type LogoSize = "sm" | "md";

interface LogoProps {
	size?: LogoSize;
	spacing?: number;
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

export function Logo({ size = "md", spacing = 0 }: LogoProps) {
	const config = logoConfig[size];

	return (
		<div style={{ margin: `${spacing}px` }}>
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

import Image from "next/image";

export type LogoSize = "sm" | "md";

interface LogoProps {
	size?: LogoSize;
	className?: string;
}

const logoConfig = {
	sm: {
		width: 100,
		height: 25,
		src: "/logos/logoSm.png",
	},
	md: {
		width: 184,
		height: 45,
		src: "/logos/logoMd.png",
	},
};

export function Logo({ size = "md", className }: LogoProps) {
	const config = logoConfig[size];

	return (
		<div className={className}>
			<Image
				src={config.src}
				alt="logo"
				width={config.width}
				height={config.height}
			/>
		</div>
	);
}

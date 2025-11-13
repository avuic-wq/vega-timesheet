import type { Metadata } from "next";
import { Nunito, Vend_Sans } from "next/font/google";
import "./globals.css";

const VendSansFont = Vend_Sans({
	variable: "--font-vend-sans",
	subsets: ["latin"],
});

const NunitoFont = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Vega IT Timesheet",
	description: "Created by Vega IT",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${VendSansFont.variable} ${NunitoFont.variable} antialiased bg-grey-100 `}
			>
				{children}
			</body>
		</html>
	);
}

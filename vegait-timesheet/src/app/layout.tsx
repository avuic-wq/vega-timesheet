import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

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
			<body className={`${NunitoFont.variable} antialiased bg-grey-100 `}>
				{children}
			</body>
		</html>
	);
}

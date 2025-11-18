import type React from "react";
import Logo from "@/src/components/Shared/Logo/Logo";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-grey-100 flex items-center justify-center flex-col h-screen">
			<Logo className="mb-5" />
			<div className="bg-white rounded-[16px] p-10 flex items-center justify-center w-98">
				{children}
			</div>
		</div>
	);
}

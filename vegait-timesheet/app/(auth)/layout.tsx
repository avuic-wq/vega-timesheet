import { Logo } from "@/components/Logo";
import type React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-grey-100 flex items-center justify-center flex-col h-screen">
			<Logo spacing={{ bottom: 20 }} />
			<div className="bg-white w-[392px] h-[252px] rounded-[16px] flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}

import type React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-grey-100 flex items-center justify-center h-screen">
			<div className="bg-white w-[392px] h-[252px] rounded-[12px] flex items-center justify-center">
				{children}
			</div>
		</div>
	);
}

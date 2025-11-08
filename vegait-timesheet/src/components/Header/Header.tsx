"use client";

import { usePathname } from "next/navigation";
import Text from "@/src/components/Text";
import Action from "./Action";
import { configs as headerConfigs } from "./configs";
import Search from "./Search";

const staticStyles = "flex bg-white rounded-[16px] p-6 gap-2";

export default function Header() {
	const pathname = usePathname();

	const config = headerConfigs[pathname] || {};
	const { title, description, actionHandler, hasSearch } = config;

	const dynamicStyles = `${hasSearch ? "justify-center" : "justify-left"}`;
	// CHECK: Its better to have a hook that returns actionHandlers?
	// CHECK: Whole header is client component only because of the usePathname()

	return (
		<div className={`${staticStyles} ${dynamicStyles}`}>
			<div className="basis-[45%] flex flex-col gap-6">
				<Text value={title} className="font-bold heading-lg" />
				<Text value={description} className="text-lg" />
				{actionHandler && <Action pathname={pathname} />}
			</div>

			{hasSearch && (
				<div className="basis-[55%] flex justify-end items-center">
					<div className="basis-[60%] h-fit">
						<Search />
					</div>
				</div>
			)}
		</div>
	);
}

"use client";

import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { configs as headerConfigs } from "./configs";
import Search from "./Search";

const staticStyles = "flex bg-white rounded-[16px] p-6 gap-2";

export default function Header() {
	const pathname = usePathname();
	const config = headerConfigs[pathname] || {};
	const { title, description, actionText, actionHandler, hasSearch } = config;

	const dynamicStyles = `${hasSearch ? "justify-center" : "justify-left"}`;
	// CHECK: Its better to have a hook that returns actionHandlers?

	return (
		<div className={`${staticStyles} ${dynamicStyles}`}>
			<div className="basis-[45%] flex flex-col gap-6">
				<Text value={title} className="font-bold heading-lg" />
				<Text value={description} className="text-lg" />
				{actionHandler && (
					<div className="flex justify-left align-center gap-2 cursor-pointer w-fit">
						<Icon name="plus" onClick={actionHandler} />
						<Text value={actionText} className="body-md" />
					</div>
				)}
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

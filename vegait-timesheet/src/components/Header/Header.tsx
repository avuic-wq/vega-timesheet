"use client";

import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { configs as headerConfigs } from "./configs";

export default function Header() {
	const pathname = usePathname();
	const config = headerConfigs[pathname] || {};
	const { title, description, actionText, actionHandler } = config;
	// TO-DO: Header title should be heading - lg
	// CHECK: Its better to have a hook that returns actionHandlers?

	return (
		<div className="flex justify-center bg-white rounded-[16px] p-6">
			<div className="flex-1 flex flex-col gap-6">
				<Text value={title} className="font-bold heading-lg" />
				<Text value={description} className="text-lg" />
				{actionHandler && (
					<div className="flex justify-left align-center gap-2 cursor-pointer w-fit">
						<Icon name="plus" onClick={actionHandler} />
						<Text value={actionText} className="body-md" />
					</div>
				)}
			</div>

			<div className="flex-1 border-1">{/* // Search */}</div>
		</div>
	);
}

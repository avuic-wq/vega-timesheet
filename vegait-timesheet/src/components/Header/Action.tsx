"use client";

import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { config } from "./config";

const Action = () => {
	const pathname = usePathname();
	const { actionText, actionHandler } = config[pathname];
	return (
		<div className="flex justify-left align-center gap-2 cursor-pointer w-fit">
			<Icon name="plus" onClick={actionHandler} />
			<Text value={actionText} className="body-md" />
		</div>
	);
};

export default Action;

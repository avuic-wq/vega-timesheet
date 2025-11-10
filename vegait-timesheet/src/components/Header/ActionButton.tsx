"use client";

import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { config } from "./config";

const ActionButton = () => {
	const pathname = usePathname();
	const { actionText } = config[pathname];

	return (
		<div className="flex justify-left align-center gap-2 cursor-pointer w-fit">
			<Icon name="plus" onClick={() => {}} />
			<Text value={actionText} className="body-md" />
		</div>
	);
};

export default ActionButton;

"use client";

import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { configs } from "./configs";

interface Props {
	pathname: string;
}

export default function Action({ pathname }: Props) {
	const { actionText, actionHandler } = configs[pathname];
	return (
		<div className="flex justify-left align-center gap-2 cursor-pointer w-fit">
			<Icon name="plus" onClick={actionHandler} />
			<Text value={actionText} className="body-md" />
		</div>
	);
}

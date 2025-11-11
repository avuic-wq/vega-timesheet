"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { config } from "./config";

interface Props {
	setting: string;
}

const ActionButton = ({ setting }: Props) => {
	const pathname = usePathname();
	const { actionText } = config[setting];

	return (
		<Link
			href={`${pathname}/create`}
			scroll={false}
			className="flex justify-left align-center gap-2 cursor-pointer w-fit"
		>
			<Icon name="plus" />
			<Text value={actionText} className="body-md" />
		</Link>
	);
};

export default ActionButton;

import type { Client, Project } from "@prisma/client";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { isClientType } from "@/src/lib/typeguards/isClientType";

export type ListItem = Client | Project;

interface Props {
	item: ListItem;
	onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function ListItem({ item }: Props) {
	const isClient = isClientType(item);

	return (
		<div className="flex justify-between px-6 py-3 bg-primary rounded-[16px] mt-2">
			{/* // TO-DO: Change to button and add cursor:pointer */}
			<div className="flex flex-row gap-2">
				<Text value={item.name} />
				{isClient && (
					<Text value={item.countryCode} className="text-grey-500" />
				)}
			</div>
			<Icon name="chevron-right" />
		</div>
	);
}

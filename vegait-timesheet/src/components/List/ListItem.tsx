"use client";

import type { Client, Project } from "@prisma/client";
import { getCountryData, type TCountryCode } from "countries-list";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon/Icon";
import type { BaseItem } from "@/src/components/List/types";
import Text from "@/src/components/Text/Text";
import { isClientType } from "@/src/lib/typeguards/isClientType";
import { isProjectType } from "@/src/lib/typeguards/isProjectType";

export type ListItem = Client | Project;

interface Props<T extends BaseItem> {
	item: T;
}

const ListItem = <T extends BaseItem>({ item }: Props<T>) => {
	const pathname = usePathname();
	const isClient = isClientType(item);
	const isProject = isProjectType(item);

	const countryName = isClient
		? getCountryData(item.countryCode as TCountryCode)?.name
		: "";
	const clientName = isProject ? item.clientId : "";

	return (
		<Link href={`${pathname}/edit/${item.id}`} scroll={false}>
			<div className="flex justify-between px-6 py-3 bg-primary rounded-[16px] mt-2 w-full cursor-pointer">
				<div className="flex gap-2">
					<Text value={item.name} />
					<Text
						value={isClient ? countryName : clientName}
						className="text-grey-500"
					/>
				</div>
				<Icon name="chevron-right" />
			</div>
		</Link>
	);
};

export default ListItem;

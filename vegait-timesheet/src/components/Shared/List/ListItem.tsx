"use client";

import { getCountryData, type TCountryCode } from "countries-list";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/src/components/Shared/Icon/Icon";
import type { BaseItem } from "@/src/components/Shared/List/types";
import Text from "@/src/components/Shared/Text/Text";
import { isClientType } from "@/src/lib/typeguards/isClientType";
import { isProjectType } from "@/src/lib/typeguards/isProjectType";

const getSecondaryText = (item: BaseItem) => {
	if (isClientType(item)) {
		return item.countryCode;
	}

	if (isProjectType(item)) {
		return item.clientName;
	}
};

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
	const clientName = isProject ? item.clientName : "";

	return (
		<Link href={`${pathname}/edit/${item.id}`} scroll={false}>
			<div className="flex justify-between px-6 py-3 bg-primary rounded-2xl mt-2 w-full cursor-pointer">
				<div className="flex gap-2">
					<Text value={item.name} />
					<Text value={getSecondaryText(item)} className="text-grey-500" />
				</div>
				<Icon name="chevron-right" />
			</div>
		</Link>
	);
};

export default ListItem;

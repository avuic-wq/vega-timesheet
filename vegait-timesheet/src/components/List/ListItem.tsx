"use client";

import type { Client, Project } from "@prisma/client";
import { getCountryData, type TCountryCode } from "countries-list";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { isClientType } from "@/src/lib/typeguards/isClientType";

export type ListItem = Client | Project;

interface Props {
	item: ListItem;
}

const ListItem = ({ item }: Props) => {
	const pathname = usePathname();
	const isClient = isClientType(item);
	const countryName = isClient
		? getCountryData(item.countryCode as TCountryCode)?.name
		: "";

	return (
		<Link href={`${pathname}/edit/${item.id}`} scroll={false}>
			<div className="flex justify-between px-6 py-3 bg-primary rounded-[16px] mt-2 w-full cursor-pointer">
				<div className="flex gap-2">
					<Text value={item.name} />
					{isClient && <Text value={countryName} className="text-grey-500" />}
				</div>
				<Icon name="chevron-right" />
			</div>
		</Link>
	);
};

export default ListItem;

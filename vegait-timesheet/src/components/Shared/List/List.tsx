import type { BaseItem } from "@/src/components/Shared/List/types";
import ListItem from "./ListItem";
import Pagination from "./Pagination/Pagination";

interface Props<T extends BaseItem> {
	items: T[];
	totalPages: number;
	currentPage: number;
}

export const List = <T extends BaseItem>({
	items,
	totalPages,
	currentPage,
}: Props<T>) => {
	return (
		<div className="flex flex-col">
			<ul className="min-h-[608px]">
				{items.map((item) => {
					return <ListItem key={item.id} item={item} />;
				})}
			</ul>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
};

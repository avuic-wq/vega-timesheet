import { debounce } from "lodash";
import { DEBOUNCE_TIME } from "@/src/lib/consts";
import type { ListItem as ListItemType } from "./ListItem";
import ListItem from "./ListItem";
import Pagination from "./Pagination/Pagination";

interface Props {
	data: ListItemType[];
	totalPages: number;
	currentPage: number;
}

export const List = ({ data, totalPages, currentPage }: Props) => {
	const handleItemClick = () => {};

	const debouncedItemClick = debounce(handleItemClick, DEBOUNCE_TIME.DEFAULT);

	return (
		<div className="flex flex-col gap-6">
			<ul>
				{data.map((item) => {
					return (
						<ListItem key={item.id} item={item} onClick={debouncedItemClick} />
					);
				})}
			</ul>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
};

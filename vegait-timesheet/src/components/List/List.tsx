import { debounce } from "lodash";
import { DEBOUNCE_TIME } from "@/src/lib/consts";
import type { ListItem as ListItemType } from "./ListItem";
import ListItem from "./ListItem";
import Pagination from "./Pagination";

interface Props {
	data: ListItemType[];
	totalPages: number;
	currentPage: number;
}

export function List({ data, totalPages, currentPage }: Props) {
	const handleRowClick = () => {};

	const debouncedRowClick = debounce(handleRowClick, DEBOUNCE_TIME.DEFAULT);

	return (
		<div>
			<ul>
				{data.map((row) => {
					return (
						<ListItem key={row.id} item={row} onClick={debouncedRowClick} />
					);
				})}
			</ul>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
}

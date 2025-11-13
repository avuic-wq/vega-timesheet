import type { ListItem as ListItemType } from "./ListItem";
import ListItem from "./ListItem";
import Pagination from "./Pagination/Pagination";

interface Props {
	data: ListItemType[];
	totalPages: number;
	currentPage: number;
}

export const List = ({ data, totalPages, currentPage }: Props) => {
	return (
		<div className="flex flex-col gap-6 min">
			{/* // TO-DO: Do we want min-h or not? */}
			<ul className="min-h-[608px]">
				{data.map((item) => {
					return <ListItem key={item.id} item={item} />;
				})}
			</ul>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
};

import Skeleton from "react-loading-skeleton";
import { ITEMS_PER_PAGE } from "@/src/lib/consts";
import "react-loading-skeleton/dist/skeleton.css";
import Icon from "@/src/components/Shared/Icon/Icon";

export function ListSkeleton() {
	return (
		<div className="flex flex-col gap-6 min">
			<ul className="min-h-[608px]">
				{[...Array(ITEMS_PER_PAGE.DEFAULT)].map((_, i) => (
					<ListItemSkeleton key={i} />
				))}
			</ul>
			<PaginationSkeleton />
		</div>
	);
}

function ListItemSkeleton() {
	return (
		<li className="px-6 py-3 bg-primary rounded-2xl mt-2 w-full">
			<div className="flex justify-between items-center">
				<div className="flex gap-2 flex-1">
					<Skeleton
						width={120}
						height={20}
						baseColor="var(--color-grey-200)"
						highlightColor="var(--color-grey-200)"
					/>

					<Skeleton
						width={180}
						height={20}
						baseColor="var(--color-grey-200)"
						highlightColor="var(--color-grey-200)"
					/>
				</div>
				<Icon name="chevron-right" />
			</div>
		</li>
	);
}

function PaginationSkeleton() {
	return (
		<div className="flex justify-center gap-2">
			{[...Array(5)].map((_, i) => (
				<Skeleton
					key={i}
					width={36}
					height={36}
					borderRadius={8}
					baseColor="#f2f2f2"
					highlightColor="#ffffff"
				/>
			))}
		</div>
	);
}

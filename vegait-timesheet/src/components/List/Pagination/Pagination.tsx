import Text from "@/src/components/Text";
import NavigateButton from "./NavigateButton";
import PaginationItem from "./PaginationItem";
import { getPaginationElementKey, getPagingationElements } from "./utils";

export const NAVIGATE_BUTTON_ORIENTATION = {
	LEFT: "left",
	RIGHT: "right",
};

export const config = {
	ALL_PAGES_VISIBLE_THRESHOLD: 7,
	// Number of pages to show on each side of current page
	PAGES_AROUND_CURRENT: 2,
	ELLIPSIS_VALUE: "...",
} as const;

export type PagingationConfig = typeof config;

interface Props {
	currentPage: number;
	totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: Props) => {
	const pagingationItems = getPagingationElements(
		totalPages,
		currentPage,
		config,
	);

	if (totalPages <= 1) return null;

	// TO-DO: Can I use my button component?
	return (
		<div className="flex items-center justify-center space-x-1">
			<NavigateButton
				orientation={NAVIGATE_BUTTON_ORIENTATION.LEFT}
				currentPage={currentPage}
				totalPages={totalPages}
			/>

			{pagingationItems.map((item, index) => {
				const isElipsis = typeof item === "string";

				if (isElipsis) {
					return (
						<Text
							key={`${config.ELLIPSIS_VALUE}-${index}`}
							value={config.ELLIPSIS_VALUE}
							className="hover:cursor-default min-w-4 text-center"
						/>
					);
				}

				return (
					<PaginationItem
						key={getPaginationElementKey(item, index)}
						value={item}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
				);
			})}
			<NavigateButton
				orientation={NAVIGATE_BUTTON_ORIENTATION.RIGHT}
				currentPage={currentPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default Pagination;

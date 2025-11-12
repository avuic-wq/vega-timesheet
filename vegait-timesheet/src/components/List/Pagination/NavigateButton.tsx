"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/src/components/Button/Button";
import Icon from "@/src/components/Icon";
import type { NAVIGATE_BUTTON_ORIENTATION } from "./Pagination";
import { createPageParams } from "./utils";

type NavigateButtonOrientation =
	(typeof NAVIGATE_BUTTON_ORIENTATION)[keyof typeof NAVIGATE_BUTTON_ORIENTATION];

interface Props {
	orientation: NavigateButtonOrientation;
	currentPage: number;
	totalPages: number;
}

const NavigateButton = ({ orientation, currentPage, totalPages }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isLeftNavigationButton = orientation === "left";
	const isDisabled = isLeftNavigationButton
		? currentPage === 1
		: currentPage === totalPages;
	const pageToNavigateTo = isLeftNavigationButton
		? currentPage - 1
		: currentPage + 1;

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		const pageParams = createPageParams(page, searchParams);
		router.push(pageParams, { scroll: false });
	};

	return (
		<Button
			variant="custom"
			onClick={() => handlePageChange(pageToNavigateTo)}
			isDisabled={isDisabled}
			className="disabled:opacity-20"
		>
			<Icon name={isLeftNavigationButton ? "chevron-left" : "chevron-right"} />
		</Button>
	);
};

export default NavigateButton;

import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { type JSX, useCallback } from "react";
import Button from "@/src/components/Shared/Button/Button";
import Icon from "@/src/components/Shared/Icon/Icon";

interface HookResult {
	renderNavigationButton: (orientation: "left" | "right") => JSX.Element;
}

const useCalendarNavigationButtons = (): HookResult => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const selectedMonth =
		Number(searchParams.get("month")) || new Date().getMonth() + 1;
	const selectedYear =
		Number(searchParams.get("year")) || new Date().getFullYear();

	const handleNavigeToPreviousMonth = useCallback(() => {
		const params = new URLSearchParams(searchParams);

		if (selectedMonth === 1) {
			params.set("month", "12");
			params.set("year", String(selectedYear - 1));
			router.push(`?${params.toString()}`, { scroll: false });
			return;
		}

		params.set("month", String(selectedMonth - 1));
		params.set("year", String(selectedYear));
		router.push(`?${params.toString()}`, { scroll: false });
	}, [searchParams, router, selectedYear, selectedMonth]);

	const handleNavigateToNextMonth = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (selectedMonth === 12) {
			params.set("month", "1");
			params.set("year", String(selectedYear + 1));
			router.push(`?${params.toString()}`, { scroll: false });
			return;
		}

		params.set("month", String(selectedMonth + 1));
		params.set("year", String(selectedYear));
		router.push(`?${params.toString()}`, { scroll: false });
	}, [searchParams, router, selectedYear, selectedMonth]);

	const renderNavigationButton = (orientation: "left" | "right") => {
		const iconName = orientation === "left" ? "chevron-left" : "chevron-right";
		const debouncedHandler =
			orientation === "left"
				? debounce(handleNavigeToPreviousMonth, 300)
				: debounce(handleNavigateToNextMonth, 300);

		return (
			<Button
				variant="custom"
				className="flex justify-center bg-white rounded-xl h-full w-15"
				onClick={debouncedHandler}
			>
				<Icon name={iconName} />
			</Button>
		);
	};

	return {
		renderNavigationButton,
	};
};

export default useCalendarNavigationButtons;

"use client";

import { useSearchParams } from "next/navigation";
import Text from "@/src/components/Shared/Text/Text";
import useCalendarNavigationButtons from "@/src/components/Timesheet/Calendar/useCalendarNavigationButtons";
import { getMonthName } from "@/src/components/Timesheet/Calendar/utils";

const Navigation = () => {
	const searchParams = useSearchParams();

	const selectedMonth =
		Number(searchParams.get("month")) || new Date().getMonth() + 1;
	const selectedYear =
		Number(searchParams.get("year")) || new Date().getFullYear();

	const { renderNavigationButton } = useCalendarNavigationButtons();

	return (
		<div className="flex items-center gap-6 h-12">
			{renderNavigationButton("left")}

			<div className="flex-1 flex justify-center items-center gap-2 bg-white rounded-xl h-full">
				<Text value={getMonthName(selectedMonth)} />
				<Text value={`${selectedYear.toString()}.`} />
			</div>

			{renderNavigationButton("right")}
		</div>
	);
};

export default Navigation;

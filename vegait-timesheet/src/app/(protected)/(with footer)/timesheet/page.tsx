import {
	addDays,
	eachDayOfInterval,
	format,
	startOfMonth,
	startOfWeek,
} from "date-fns";
import Header from "@/src/components/Shared/Header/Header";
import Calendar from "@/src/components/Timesheet/Calendar/Calendar";
import { APP_ROUTES } from "@/src/lib/consts";
import type { SearchParams } from "@/src/lib/types";

import { mapTimelogsToDays } from "@/src/lib/utils/mapTimelogsToDays";
import { getFilteredTimeLogsAction } from "@/src/server-actions/timelogs/actions";

interface Props {
	searchParams: SearchParams;
}

export default async function Timesheet({ searchParams }: Props) {
	const params = await searchParams;
	const monthParam = Number(params?.month) || new Date().getMonth() + 1;
	const yearParam = Number(params?.year) || new Date().getFullYear();

	const activeMonthAndYear = new Date(yearParam, monthParam - 1);

	const monthStart = startOfMonth(activeMonthAndYear);
	const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
	const gridEnd = addDays(gridStart, 41);

	const timeLogs = await getFilteredTimeLogsAction({
		fromDate: format(gridStart, "yyyy-MM-dd"),
		toDate: format(gridEnd, "yyyy-MM-dd"),
	});

	const gridPeriod = eachDayOfInterval({
		start: gridStart,
		end: gridEnd,
	});

	const daysWithTimelogs = mapTimelogsToDays(
		gridPeriod,
		timeLogs,
		activeMonthAndYear,
	);

	return (
		<>
			<Header setting={APP_ROUTES.TIMESHEET} />
			<Calendar days={daysWithTimelogs} />
		</>
	);
}

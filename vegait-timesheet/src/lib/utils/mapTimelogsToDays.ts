import {
	type EachDayOfIntervalResult,
	isSameDay,
	isSameMonth,
	isToday,
} from "date-fns";
import type { TimesheetTimelog } from "@/src/db/TimelogService/types";

export const mapTimelogsToDays = (
	interval: EachDayOfIntervalResult<
		{
			start: Date;
			end: Date;
		},
		undefined
	>,
	timelogs: TimesheetTimelog[],
	activeMonthAndYear: Date,
) => {
	return interval.map((date) => ({
		date,
		timelogs: timelogs
			.filter((tl) => isSameDay(tl.date, date))
			.map((tl) => ({ hours: Number(tl.hours), projectName: tl.project.name })),
		belongsToActiveMonth: isSameMonth(date, activeMonthAndYear),
		isToday: isToday(date),
	}));
};

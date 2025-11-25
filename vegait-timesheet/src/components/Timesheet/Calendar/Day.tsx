import { uniqueId } from "lodash";
import { twMerge } from "tailwind-merge";
import Text from "@/src/components/Shared/Text/Text";
import type { CalendarDay } from "@/src/components/Timesheet/Calendar/types";
import { WORK_HOURS_PER_DAY } from "@/src/lib/consts";

const renderTimeLogs = (day: CalendarDay) => {
	return (
		<div className="flex gap-2 text-sm">
			<div key={day.date.toString()} className="flex flex-col">
				{day.timelogs.map((tl) => {
					return <Text key={uniqueId()} value={`${tl.hours}h`} />;
				})}
			</div>
			<div className="flex flex-col">
				{day.timelogs.map((tl) => {
					return (
						<Text
							key={uniqueId()}
							value={tl.projectName}
							className="w-20 truncate"
						/>
					);
				})}
			</div>
		</div>
	);
};

const renderNoTimelgosInfo = () => {
	return <Text value="No hours yet" className="text-sm" />;
};

const getStyles = (
	isTodaysDate?: boolean,
	dateBelongsToSelectedMonth?: boolean,
	hasNoTimelogs?: boolean,
	hasOvertimeHours?: boolean,
) => {
	const commonStyle = "flex flex-col gap-2 rounded-xl p-6 bg-primary h-30 w-40";
	const todayStyle = isTodaysDate ? "border-2 border-red" : "";
	const disabledStyle = !dateBelongsToSelectedMonth ? "opacity-25" : "";
	const noTimelogsStyle = hasNoTimelogs ? "bg-grey-200" : "";
	const overtimeStyle = hasOvertimeHours ? "bg-orange-light" : "";

	return twMerge(
		commonStyle,
		todayStyle,
		disabledStyle,
		noTimelogsStyle,
		overtimeStyle,
	);
};

interface Props {
	data: CalendarDay;
}

const Day = ({ data }: Props) => {
	const isTodaysDate = data.isToday;
	const dateBelongsToSelectedMonth = data.belongsToActiveMonth;
	const hasNoTimelogs = !data.timelogs?.length;
	const hasOvertime =
		data.timelogs.reduce((sum, timelog) => {
			return sum + timelog.hours;
		}, 0) > WORK_HOURS_PER_DAY;

	return (
		<div
			className={getStyles(
				isTodaysDate,
				dateBelongsToSelectedMonth,
				hasNoTimelogs,
				hasOvertime,
			)}
		>
			<div className="cursor-default text-4xl">{data?.date.getDate()}</div>

			<div className="flex flex-col items-center">
				{data?.timelogs?.length ? renderTimeLogs(data) : renderNoTimelgosInfo()}
			</div>
		</div>
	);
};

export default Day;

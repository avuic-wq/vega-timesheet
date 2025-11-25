import Day from "@/src/components/Timesheet/Calendar/Day";
import Header from "@/src/components/Timesheet/Calendar/Header";
import Navigation from "@/src/components/Timesheet/Calendar/Navigation";
import type { CalendarDay } from "@/src/components/Timesheet/Calendar/types";

interface Props {
	days: CalendarDay[];
}

const Calendar = ({ days }: Props) => {
	return (
		<div className="flex flex-col gap-5">
			<Navigation />
			<div className="grid grid-cols-7 gap-y-2 gap-x-0 place-items-center p-6 bg-white rounded-xl">
				<Header />
				{days.map((day) => (
					<Day key={day.date?.toString()} data={day} />
				))}
			</div>
		</div>
	);
};

export default Calendar;

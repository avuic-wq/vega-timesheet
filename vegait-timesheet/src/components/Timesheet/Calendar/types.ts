export type CalendarDay = {
	date: Date;
	timelogs: CalendarTimelog[];
	belongsToActiveMonth?: boolean;
	isToday?: boolean;
};

export type CalendarTimelog = {
	hours: number;
	projectName: string;
};

export type CalendarFilters = {
	fromDate: string;
	toDate: string;
};

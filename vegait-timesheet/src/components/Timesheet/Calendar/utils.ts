import { monthNames } from "@/src/components/Timesheet/Calendar/consts";

export const getMonthName = (month: number) => monthNames[month - 1];

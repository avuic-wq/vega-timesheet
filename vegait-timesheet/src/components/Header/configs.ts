import { APP_ROUTES } from "@/src/lib/consts";
import type { IconProps } from "../Icon";

type ConfigProps = {
	title: string;
	description?: string;
	actionText?: string;
	actionHandler?: IconProps["onClick"];
};

export const configs: Record<string, ConfigProps> = {
	[APP_ROUTES.TIMESHEET]: {
		title: "Timesheet",
		description:
			"What did you work on today? Don't forget to add all working and overtime hours for each client. ",
		actionText: "Create time log",
		actionHandler: undefined,
	},
	[APP_ROUTES.CLIENTS]: {
		title: "Clients",
		description: "Manage clients",
		actionText: "Action",
		actionHandler: () => {
			console.log("Take action - clients");
		},
	},
	[APP_ROUTES.PROJECTS]: {
		title: "Projects",
		description:
			"Here, you have full control over your project database, empowering you to efficiently organise and maintain your client.",
		actionText: "Action",
		actionHandler: () => {
			console.log("Take action - projects");
		},
	},
	[APP_ROUTES.REPORTS]: {
		title: "Reports",
		description:
			"Choose from a range of criteria including date range, client, project, category, employee, and more to tailor your reports exactly as required. ",
		actionHandler: undefined,
	},
};

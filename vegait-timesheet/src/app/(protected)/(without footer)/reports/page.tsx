import Header from "@/src/components/Shared/Header/Header";
import { APP_ROUTES } from "@/src/lib/consts";

export default function Reports() {
	return (
		<div className="flex flex-col gap-4">
			<Header setting={APP_ROUTES.REPORTS}>{/* <ReportFilters> */}</Header>
			{/* <ReportsTable /> */}
		</div>
	);
}

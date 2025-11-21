import Link from "next/link";
import Button from "@/src/components/Shared/Button/Button";
import Icon from "@/src/components/Shared/Icon/Icon";
import Logo from "@/src/components/Shared/Logo/Logo";
import Text from "@/src/components/Shared/Text/Text";
import { APP_ROUTES } from "@/src/lib/consts";
import { logoutAction } from "@/src/server-actions/auth/actions";

const pages = [
	{ name: "Timesheet", route: APP_ROUTES.TIMESHEET },
	{ name: "Clients", route: APP_ROUTES.CLIENTS },
	{ name: "Projects", route: APP_ROUTES.PROJECTS },
	{ name: "Reports", route: APP_ROUTES.REPORTS },
];

const Navigation = () => {
	const handleOnLogout = async () => {
		await logoutAction();
	};

	return (
		<nav className="flex items-center justify-between bg-white gap-6 py-4 px-12">
			<div>
				<Logo size="sm" />
			</div>

			<div className="flex items-center justify-between gap-12">
				{pages.map((page) => {
					return (
						<Link
							key={page.name}
							href={page.route}
							className="hover:text-shadow-md"
						>
							{page.name}
						</Link>
					);
				})}
			</div>
			<div className="flex justify-between gap-5">
				<form action={handleOnLogout}>
					<Button type="submit" className="px-9">
						<Text value={"Logout"} />
					</Button>
				</form>
				<Icon name="menu" />
			</div>
		</nav>
	);
};

export default Navigation;

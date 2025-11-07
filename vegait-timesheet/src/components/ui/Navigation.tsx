import Link from "next/link";
import { logoutAction } from "@/src/server-actions/auth";
import Button from "./Button";
import { Logo } from "./Logo";

const pages = [
	{ name: "Timesheet", route: "/timesheet" },
	{ name: "Clients", route: "/clients" },
	{ name: "Projects", route: "/projects" },
	{ name: "Reports", route: "/reports" },
];

export default function Navigation() {
	return (
		<nav className="bg-white flex items-center justify-between gap-6 pt-[16px] pb-[16px] pl-[48px] pr-[48px] gap-[24px]">
			<div>
				<Logo size="sm" />
			</div>
			{/* // CHECK: prefetch={true or false} on link? */}
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
			<div>
				<form action={logoutAction}>
					<Button type="submit" text="Logout" />
				</form>
			</div>
		</nav>
	);
}

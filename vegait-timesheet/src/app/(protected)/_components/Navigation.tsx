import Link from "next/link";
import Button from "@/src/components/Button";
import { Logo } from "@/src/components/Logo";
import { logoutAction } from "@/src/server-actions/auth";

const pages = [
	{ name: "Timesheet", route: "/timesheet" },
	{ name: "Clients", route: "/clients" },
	{ name: "Projects", route: "/projects" },
	{ name: "Reports", route: "/reports" },
];

export default function Navigation() {
	return (
		<nav className="flex items-center justify-between bg-white gap-6 py-4 px-12">
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

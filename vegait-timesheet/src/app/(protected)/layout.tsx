import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import Navigation from "@/src/components/Navigation";
import { APP_ROUTES } from "@/src/lib/consts";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		redirect(APP_ROUTES.LOGIN);
	}

	return (
		<>
			<Navigation />
			{children}
		</>
	);
}

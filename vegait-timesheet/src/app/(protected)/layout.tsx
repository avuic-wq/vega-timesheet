import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import Header from "@/src/app/(protected)/_components/Header";
import Navigation from "@/src/app/(protected)/_components/Navigation";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session) {
		redirect("/login");
	}

	return (
		<>
			<Navigation />
			<Header />
			<main>{children}</main>
		</>
	);
}

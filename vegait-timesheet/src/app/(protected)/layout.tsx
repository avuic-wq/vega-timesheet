import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import Navigation from "@/src/components/Navigation";

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
			{children}
		</>
	);
}

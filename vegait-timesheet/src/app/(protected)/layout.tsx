import Navigation from "@/src/components/Shared/Navigation/Navigation";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navigation />
			{children}
		</>
	);
}

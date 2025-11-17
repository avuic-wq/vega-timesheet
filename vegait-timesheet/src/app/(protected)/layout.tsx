import Navigation from "@/src/components/Navigation/Navigation";
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

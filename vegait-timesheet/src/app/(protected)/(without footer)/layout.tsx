export default function WithoutFooterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headerConfig = [];

	return <div className="flex flex-col gap-4 mx-75 my-6">{children}</div>;
}

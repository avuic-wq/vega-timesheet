export default function WithoutFooterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headerConfig = [];

	return <div className="mx-75 my-6">{children}</div>;
}

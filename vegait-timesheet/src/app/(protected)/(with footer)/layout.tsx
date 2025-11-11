import Footer from "@/src/components/Footer";

export default function WithFooterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headerConfig = [];

	return (
		<>
			<section className="mx-75 my-6 ">{children}</section>

			<section className="mx-5 my-6">
				<Footer />
			</section>
		</>
	);
}

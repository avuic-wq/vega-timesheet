import Footer from "@/src/components/Shared/Footer/Footer";

export default function WithFooterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<section className="mx-75 my-6">{children}</section>

			<section className="mx-5 my-6">
				<Footer />
			</section>
		</>
	);
}

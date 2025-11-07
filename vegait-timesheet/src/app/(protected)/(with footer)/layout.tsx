import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

export default function WithFooterLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<section className="mx-75 my-6 border-[1px]">
				<Header />
			</section>

			<section className="mx-75 my-6 border-[1px]">{children}</section>

			<section className="mx-5 my-6 border-[1px]">
				<Footer />
			</section>
		</>
	);
}

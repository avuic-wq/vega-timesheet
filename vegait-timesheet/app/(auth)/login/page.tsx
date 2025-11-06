import { Suspense } from "react";
import LoginForm from "@/components/ui/LoginForm";

interface Props {
	searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
	const params = await searchParams;
	return (
		<Suspense>
			<LoginForm callbackUrl={params?.callbackUrl} />
		</Suspense>
	);
}

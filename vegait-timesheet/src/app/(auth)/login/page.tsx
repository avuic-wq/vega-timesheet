import LoginForm from "@/src/components/LoginForm";
import type { SearchParams } from "@/src/lib/types";

interface Props {
	searchParams: SearchParams;
}

export default async function Login({ searchParams }: Props) {
	const params = await searchParams;
	return <LoginForm callbackUrl={params?.callbackUrl} />;
}

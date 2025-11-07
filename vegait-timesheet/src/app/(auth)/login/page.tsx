import LoginForm from "@/src/app/(auth)/_components/LoginForm";

interface Props {
	searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function Login({ searchParams }: Props) {
	const params = await searchParams;
	return <LoginForm callbackUrl={params?.callbackUrl} />;
}

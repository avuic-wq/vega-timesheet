import LoginForm from "@/components/ui/LoginForm";

interface Props {
	searchParams: { callbackUrl?: string };
}

export default function LoginPage({ searchParams }: Props) {
	return <LoginForm callbackUrl={searchParams?.callbackUrl} />;
}

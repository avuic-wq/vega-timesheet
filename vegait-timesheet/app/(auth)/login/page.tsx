import LoginForm from "@/components/ui/LoginForm";

interface Props {
	callbackUrl?: string;
}

interface Props {
	searchParams: { callbackUrl?: string };
}

export default function LoginPage({ searchParams }: Props) {
	return <LoginForm callbackUrl={searchParams?.callbackUrl} />;
}

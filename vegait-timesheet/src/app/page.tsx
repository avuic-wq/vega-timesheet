import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import { APP_ROUTES } from "../lib/consts";

export default async function Home() {
	const session = await auth();

	if (session) {
		redirect(APP_ROUTES.CLIENTS);
	}

	redirect(APP_ROUTES.LOGIN);
}

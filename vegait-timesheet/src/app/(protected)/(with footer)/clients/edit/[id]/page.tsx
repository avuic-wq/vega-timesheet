import { redirect } from "next/navigation";
import { APP_ROUTES } from "@/src/lib/consts";

export default function UpdateClientDirect() {
	redirect(APP_ROUTES.CLIENTS);
}

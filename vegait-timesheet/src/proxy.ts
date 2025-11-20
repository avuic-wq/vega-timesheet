import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { APP_ROUTES } from "./lib/consts";

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const { pathname } = req.nextUrl;

	const publicRoutes = [APP_ROUTES.LOGIN, APP_ROUTES.REGISTER];
	const isPublicRoute = publicRoutes.includes(pathname);

	if (!isLoggedIn && !isPublicRoute) {
		const loginUrl = new URL(APP_ROUTES.LOGIN, req.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	if (isLoggedIn && pathname === APP_ROUTES.LOGIN) {
		return NextResponse.redirect(new URL(APP_ROUTES.CLIENTS, req.url));
	}

	if (isLoggedIn && pathname === "/") {
		return NextResponse.redirect(new URL(APP_ROUTES.CLIENTS, req.url));
	}

	return NextResponse.next();
});

export const config = {
	// Match all request paths except for the ones starting with:
	// - api (API routes)
	// - _next/static (static files)
	// - _next/image (image optimization files)
	// - favicon.ico (favicon file)
	matcher: "/((?!api|_next/static|_next/image|favicon.ico|icons|.*\\..*).*)",
};

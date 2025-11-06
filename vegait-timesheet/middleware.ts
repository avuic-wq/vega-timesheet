import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";

export default auth((req) => {
	const isLoggedIn = !!req.auth;
	const { pathname } = req.nextUrl;

	const publicRoutes = ["/", "/login"];
	const isPublicRoute = publicRoutes.includes(pathname);

	if (!isLoggedIn && !isPublicRoute) {
		const loginUrl = new URL("/login", req.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	if (isLoggedIn && pathname === "/login") {
		return NextResponse.redirect(new URL("/clients", req.url));
	}

	if (isLoggedIn && pathname === "/") {
		return NextResponse.redirect(new URL("/clients", req.url));
	}

	return NextResponse.next();
});

export const config = {
	// Match all request paths except for the ones starting with:
	// - api (API routes)
	// - _next/static (static files)
	// - _next/image (image optimization files)
	// - favicon.ico (favicon file)
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

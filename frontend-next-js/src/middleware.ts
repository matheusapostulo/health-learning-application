import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	// if (isLoggedIn && !req.auth?.user.orgId) return NextResponse.redirect(new URL("/onboarding", req.url));
});

export const config = {
	/*
	 * Match all request paths except for the ones starting with:
	 * - api (API routes)
	 * - _next/static (static files)
	 * - _next/image (image optimization files)
	 * - favicon.ico (favicon file)
	 */
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
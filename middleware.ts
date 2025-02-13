import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value; // Read token from cookies

    const { pathname } = request.nextUrl;

    // If user is logged in, prevent access to login/signup
    if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If user is NOT logged in, prevent access to dashboard
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next(); // Continue if no redirect needed
}

export const config = {
    matcher: ["/login", "/signup", "/dashboard/:path*", "/dashboard/cart/:path*"],
};

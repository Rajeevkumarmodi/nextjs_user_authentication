import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Middleware function
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value || "";

  // Redirect user to login if no token is present
  if (!token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRETE);
  try {
    const { payload } = await jwtVerify(token, secret);
    const decoded = payload as { userId: string; isAdmin: boolean };

    // Check if user is trying to access admin page
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!decoded.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Prevent logged in user from accessing login or signup page
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Specify the paths for the middleware to run
export const config = {
  matcher: ["/", "/admin", "/login", "/signup"],
};

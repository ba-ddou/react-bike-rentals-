import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {
    nextUrl: { pathname },
    cookies,
  } = request;
  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/reservations", request.url));
  }

  //   return NextResponse.redirect(new URL("/dashboard/auth", request.url));
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard",
};

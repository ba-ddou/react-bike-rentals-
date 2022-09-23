import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {
    nextUrl: { pathname },
    cookies,
  } = request;
    console.log("🚀 ~ file: middleware.ts ~ line 10 ~ middleware ~ pathname", pathname)
  console.log(
    "🚀 ~ file: middleware.ts ~ line 10 ~ middleware ~ cookies",
    cookies
  );
  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/users", request.url));
  }

  //   return NextResponse.redirect(new URL("/dashboard/auth", request.url));
}

// // See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard",
};

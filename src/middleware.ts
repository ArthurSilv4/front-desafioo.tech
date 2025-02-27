import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token-desafioo.tech");
  const isLoginPage = request.nextUrl.pathname === "/singIn";
  const isAdminPage = request.nextUrl.pathname === "/dashboard/newUser";

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/singIn", request.url));
  }

  if (isAdminPage && token) {
    const payload = JSON.parse(atob(token?.value.split(".")[1] || ""));
    const userRole = payload.role;

    if (userRole !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/singIn", "/dashboard/:path*", "/newPassword/:path*"],
};

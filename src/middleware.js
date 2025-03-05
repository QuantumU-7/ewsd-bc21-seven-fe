import { NextResponse } from "next/server";
import {
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  REGISTER,
} from "./constants/routes";

const authenticatedRoutes = [LOGIN, REGISTER, FORGOT_PASSWORD];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accesstoken")?.value;

  if (authenticatedRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL(HOME, req.url));
  }

  if (authenticatedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL(LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/create", "/login"],
};

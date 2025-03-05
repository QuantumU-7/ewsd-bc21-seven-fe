import { NextResponse } from "next/server";
import {
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
} from "./constants/routes";

const publicRoutes = [LOGIN, REGISTER, FORGOT_PASSWORD];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accesstoken")?.value;
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL(LOGIN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/create"],
};

import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "./database/dbConnection";
import jwt from "jsonwebtoken";
import User from "./models/user.model";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value || "";

  let publicPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (token && publicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (
    (!token && request.nextUrl.pathname === "/") ||
    request.nextUrl.pathname === "/admin"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // return NextResponse.next();
}

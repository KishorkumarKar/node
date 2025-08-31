import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoginToken } from "./lib/manageCookieLib";

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("token")?.value;
  const token = getLoginToken();
  // console.log("--ssssss-",req);
  // getLoginToken()
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // console.log("--sss-", token);
      // return NextResponse.redirect(new URL("/teacher/login", req.url));
    }

    try {
      //   jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      // return NextResponse.redirect(new URL("/teacher/login", req.url));
    }
  }

  return NextResponse.next();
}

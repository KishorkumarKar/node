import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.endsWith("/teacher")) {
    if (!token) {
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

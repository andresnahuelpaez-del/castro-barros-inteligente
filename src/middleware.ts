import { NextResponse, type NextRequest } from "next/server";
// import { updateSession } from "@/lib/supabase/middleware";

// TODO: Reactivar cuando se conecte Supabase
export async function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

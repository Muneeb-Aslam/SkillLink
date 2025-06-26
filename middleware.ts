import { IncomingHttpHeaders } from "http";
import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const headers: IncomingHttpHeaders = {};
  requestHeaders.forEach((value, key) => {
    headers[key] = value;
  });
  const session = await getSession({ req: { ...request, headers } });
  requestHeaders.set("userId", session?.user?.id as string);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export default withAuth({
  pages: {  
    signIn: "/login",
  },
});
export const config = {
  matcher: ["/campaign/:path*", "/api/:path*", '/data-platform/:path*', '/library/:path*','/dashboard/:path*'],
  unstable_allowDynamic: [
    '/node_modules/@babel/runtime/regenerator/index.js',
    '/node_modules/next-auth/react/index.js',
  ],
};
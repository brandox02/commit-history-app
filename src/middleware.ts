import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TOKEN_KEY } from './config/axios';

export function middleware(request: NextRequest) {
   const authDataStr = request.cookies.get(TOKEN_KEY)?.value;
   const authData = JSON.parse(authDataStr || '{}');

   const isLoginPage = request.nextUrl.pathname === '/login';
   const isSignupPage = request.nextUrl.pathname === '/signup';

   if (authData?.token && (isLoginPage && isSignupPage)) {
      return NextResponse.redirect(new URL('/commit-history', request.url))
   }

   if (!authData?.token && (!isLoginPage && !isSignupPage)) {
      return NextResponse.redirect(new URL('/login', request.url));
   }

}

// See "Matching Paths" below to learn more
export const config = {
   matcher: ["/((?!api|_next/static|_next/image|/favicon.ico).*)"],
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TOKEN_KEY } from './config/axios';

export function middleware(request: NextRequest) {
   const authDataStr = request.cookies.get(TOKEN_KEY)?.value;
   const authData = JSON.parse(authDataStr || '{}');

   const whiteList = ['/login', '/signup', '/signup-confirmation']
   const isInWhiteList = whiteList.includes(request.nextUrl.pathname);

   const thereIsEmailToVerify = request.cookies.get('email-to-verify');

   if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   if (thereIsEmailToVerify && request.nextUrl.pathname !== '/signup-confirmation') {
      return NextResponse.redirect(new URL('/signup-confirmation', request.url))
   }

   if (authData?.token && isInWhiteList) {
      return NextResponse.redirect(new URL('/commit-history', request.url))
   }

   if (!authData?.token && !isInWhiteList) {
      return NextResponse.redirect(new URL('/login', request.url));
   }

}

// See "Matching Paths" below to learn more
export const config = {
   matcher: ["/((?!api|_next/static|_next/image|/favicon.ico).*)"],
}
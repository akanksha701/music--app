import { NextRequest, NextResponse } from 'next/server';

// const protectedRoutes = ['/', '/Browse', '/MyProfile'];
export default function middleware(request: NextRequest) {

  return NextResponse.next();
  // const session = request.cookies.get('user_session')?.value || '';
  // if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
  //   const absoluteURL = new URL('/Signin', request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  // if (session && request.nextUrl.pathname === '/Signin') {
  //   const absoluteURL = new URL('/Browse', request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}


export const config = {
  matcher: [
    // eslint-disable-next-line max-len
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

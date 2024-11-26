import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define private routes that require authentication
const isPrivateRoute = createRouteMatcher(['/','/Home','/MyProfile']);

export default clerkMiddleware(async (auth, request) => {
  try {
    // Check if the request matches any private routes
    if (isPrivateRoute(request)) {
      // Protect the route; this will check if the user is authenticated
      await auth.protect();
    }
  } catch (error) {
    console.error('Authentication error:', error);

    // Optionally redirect to a login page or handle the error as needed
    return NextResponse.redirect(new URL('/Signin', request.url));
  }
});

// Configuration for the middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
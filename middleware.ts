// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// const isPrivateRoute = createRouteMatcher(["/", "/Browse", "/MyProfile"]);
const protectedRoutes = ["/", "/Browse", "/MyProfile"];
export default function middleware(request: NextRequest) {
  const session = request.cookies.get("user_session")?.value || "";

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/Signin", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to home if session is set and user tries to access root
  if (session && request.nextUrl.pathname === "/Signin") {
    const absoluteURL = new URL("/Browse", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

// export default clerkMiddleware(async (auth, request) => {
//   try {
//     // Check if the request matches any private routes
//     if (isPrivateRoute(request)) {
//       // Protect the route; this will check if the user is authenticated
//       await auth.protect();
//     }
//   } catch (error) {
//     console.error("Authentication error:", error);

//     // Optionally redirect to a login page or handle the error as needed
//     return NextResponse.redirect(new URL("/Signin", request.url));
//   }
// });

// Configuration for the middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

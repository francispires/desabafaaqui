import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/companies",
    "/complaints",
    "/rankings",
    "/search",
    "/companies/:path*",
    "/complaints/:path*",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/login",
    "/signup",
    "/reset-password",
    "/verify-email"
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 
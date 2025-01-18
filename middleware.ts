import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/feed(.*)', '/notifications(.*)' , '/you(.*)' , '/write(.*)' , '/saved(.*)'])
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  // Redirect signed-in users trying to access auth pages to /feed
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/feed', req.url))
  }

  // Redirect non-signed-in users trying to access protected routes to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
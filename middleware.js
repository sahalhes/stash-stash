import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils'

const isProtectedRoute = createRouteMatcher(['/feed(.*)'])

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
    if(auth.userId) return redirect('/feed')
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
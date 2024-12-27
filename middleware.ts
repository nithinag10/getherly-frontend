import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register']
const protectedRoutes = ['/chats', '/profile']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  // Check protected routes - redirect to login if no token
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Allow all other routes to pass through
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/chats/:path*',
    '/profile/:path*'
  ]
}
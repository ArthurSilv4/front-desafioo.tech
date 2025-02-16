import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token-desafioo.tech')
  
  if (!token) {
    return NextResponse.redirect(new URL('/singIn', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/newPassword/:path*',
  ]
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get("token")?.value
    const path = request.nextUrl.pathname;
console.log(path)
    if(!cookie && path != "/login" ) {return NextResponse.redirect(new URL('/login', request.url))}

        return NextResponse.next()
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
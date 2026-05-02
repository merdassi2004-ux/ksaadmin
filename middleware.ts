import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  
  if (isAdminPage && !isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If they are on the login page but already authenticated, redirect to /admin
  if (isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    if (authCookie && authCookie.value === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

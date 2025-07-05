import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that should be protected
const protectedPaths = [
  '/dashboard',
  '/meal-plans',
  '/grocery-list',
  '/progress',
  '/community',
];

// Add paths that should be accessible without auth
const publicPaths = [
  '/signin',
  '/signup',
  '/',
  '/api/auth/signin',
  '/api/auth/signup',
  '/api/auth/me',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware: Processing request for path:', pathname);

  // Allow access to public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    console.log('Middleware: Public path, allowing access');
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  console.log('Middleware: Token present:', !!token);

  // Check if the path should be protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  console.log('Middleware: Is protected path:', isProtectedPath);

  if (isProtectedPath) {
    if (!token) {
      console.log('Middleware: No token found, redirecting to signin');
      const url = new URL('/signin', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
    console.log('Middleware: Token exists, allowing access');
    return NextResponse.next();
  }

  console.log('Middleware: Allowing request to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 
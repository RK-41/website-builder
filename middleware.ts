import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth/login');
  const isEditPage =
    req.nextUrl.pathname === '/edit' || req.nextUrl.pathname.endsWith('/edit');

  // Redirect to login if not authenticated and trying to access protected routes
  if (!token && !isAuthPage) {
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Handle authenticated users
  if (token) {
    // Redirect away from auth pages if already logged in
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Handle edit routes
    if (isEditPage && req.method === 'GET') {
      const pathWithoutEdit = req.nextUrl.pathname.slice(0, -5); // Remove '/edit'
      const pathWithEditPrefix = `/puck${pathWithoutEdit}`;
      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    }

    // Prevent direct access to puck routes
    // if (req.nextUrl.pathname.startsWith('/puck')) {
    // 	return NextResponse.redirect(new URL('/', req.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

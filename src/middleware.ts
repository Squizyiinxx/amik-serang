import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/admin') && !token) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');

    return res;
}

export const config = {
    matcher: ['/admin/:path*'],
};

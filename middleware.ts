import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const FREE_CUTOFF = Number(process.env.FREE_CUTOFF || '3');

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const slug = req.nextUrl.pathname.split('/learn/')[1];
  if (!slug) return NextResponse.next();
  const index = Number(req.nextUrl.searchParams.get('i') || 0);
  if (!token?.subscribed && index >= FREE_CUTOFF) {
    return NextResponse.redirect(new URL('/api/stripe/subscribe', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/learn/:path*'],
};

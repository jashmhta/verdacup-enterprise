import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

export function getSessionCookieOptions(req: CreateNextContextOptions['req']) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}

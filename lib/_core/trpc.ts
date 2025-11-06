import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { type User } from '@/drizzle/schema';

export interface Context {
  user: User | null;
  req: CreateNextContextOptions['req'];
  res: CreateNextContextOptions['res'];
}

export async function createContext(opts: CreateNextContextOptions): Promise<Context> {
  // In a real app, you would extract user from session/cookie
  return {
    user: null,
    req: opts.req,
    res: opts.res,
  };
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

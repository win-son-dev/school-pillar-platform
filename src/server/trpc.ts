import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { db } from '@/lib/db';

export function createTRPCContext() {
  return { db };
}

export type TRPCContext = ReturnType<typeof createTRPCContext>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

// Auth-protected procedures — stubs for Week 2
// export const protectedProcedure = t.procedure.use(...)
// export const adminProcedure = t.procedure.use(...)

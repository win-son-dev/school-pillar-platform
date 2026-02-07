import { publicProcedure, router } from '../trpc';

export const healthRouter = router({
  check: publicProcedure.query(async ({ ctx }) => {
    try {
      await ctx.db.$queryRaw`SELECT 1`;
      return { status: 'ok' as const, database: 'connected' as const };
    } catch {
      return { status: 'error' as const, database: 'disconnected' as const };
    }
  }),
});

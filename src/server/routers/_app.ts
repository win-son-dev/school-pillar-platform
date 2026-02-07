import { router } from '../trpc';
import { healthRouter } from './health';
import { platformConfigRouter } from './platformConfig';

export const appRouter = router({
  health: healthRouter,
  platformConfig: platformConfigRouter,
});

export type AppRouter = typeof appRouter;

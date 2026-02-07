import 'server-only';
import { createCallerFactory, createTRPCContext } from './trpc';
import { appRouter } from './routers/_app';

const createCaller = createCallerFactory(appRouter);

export const api = createCaller(createTRPCContext());

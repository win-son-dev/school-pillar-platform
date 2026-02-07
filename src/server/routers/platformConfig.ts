import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const platformConfigRouter = router({
  getByKey: publicProcedure.input(z.object({ key: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.platformConfig.findUnique({
      where: { key: input.key },
    });
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.platformConfig.findMany({
        where: { category: input.category },
        orderBy: { key: 'asc' },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.platformConfig.findMany({
      orderBy: { key: 'asc' },
    });
  }),

  getPublic: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.platformConfig.findMany({
      where: { isPublic: true },
      orderBy: { key: 'asc' },
    });
  }),

  upsert: publicProcedure
    .input(
      z.object({
        key: z.string(),
        value: z.unknown(),
        type: z.enum(['STRING', 'NUMBER', 'BOOLEAN', 'JSON']).optional(),
        category: z.string(),
        description: z.string().optional(),
        isPublic: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: protect with adminProcedure in Week 2
      const { key, value, type, category, description, isPublic } = input;
      return ctx.db.platformConfig.upsert({
        where: { key },
        update: {
          value: value as never,
          ...(type && { type }),
          category,
          ...(description !== undefined && { description }),
          ...(isPublic !== undefined && { isPublic }),
        },
        create: {
          key,
          value: value as never,
          type: type ?? 'STRING',
          category,
          description,
          isPublic: isPublic ?? false,
        },
      });
    }),

  delete: publicProcedure.input(z.object({ key: z.string() })).mutation(async ({ ctx, input }) => {
    // TODO: protect with adminProcedure in Week 2
    return ctx.db.platformConfig.delete({
      where: { key: input.key },
    });
  }),
});

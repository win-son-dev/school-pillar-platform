import type { PlatformConfig } from '@/generated/prisma/client';
import { db } from './db';

export async function getConfig<T = string>(key: string): Promise<T | null> {
  const config = await db.platformConfig.findUnique({
    where: { key },
  });
  if (!config) return null;
  return config.value as T;
}

export async function getConfigByCategory(category: string) {
  const configs = await db.platformConfig.findMany({
    where: { category },
    orderBy: { key: 'asc' },
  });
  return Object.fromEntries(configs.map((c: PlatformConfig) => [c.key, c.value]));
}

export async function getPublicConfig() {
  const configs = await db.platformConfig.findMany({
    where: { isPublic: true },
    orderBy: { key: 'asc' },
  });
  return Object.fromEntries(configs.map((c: PlatformConfig) => [c.key, c.value]));
}

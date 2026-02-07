import { z } from 'zod';

const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_CONNECT_CLIENT_ID: z.string().optional(),
  DAILY_API_KEY: z.string().optional(),
  DAILY_REST_DOMAIN: z.string().url().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  S3_BUCKET: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

const serverEnv = serverSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error('❌ Invalid server environment variables:', serverEnv.error.flatten().fieldErrors);
  throw new Error('Invalid server environment variables');
}

const clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!clientEnv.success) {
  console.error('❌ Invalid client environment variables:', clientEnv.error.flatten().fieldErrors);
  throw new Error('Invalid client environment variables');
}

export const env = {
  ...serverEnv.data,
  ...clientEnv.data,
};

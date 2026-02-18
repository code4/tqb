import { z } from 'zod'

const envSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_UK_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_INTL_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PORTAL_URL: z.string().url(),

    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    SANITY_API_TOKEN: z.string().optional(),
})

export const env = envSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_STRIPE_UK_URL: process.env.NEXT_PUBLIC_STRIPE_UK_URL,
    NEXT_PUBLIC_STRIPE_INTL_URL: process.env.NEXT_PUBLIC_STRIPE_INTL_URL,
    NEXT_PUBLIC_STRIPE_PORTAL_URL: process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL,

    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
})

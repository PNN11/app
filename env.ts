import { z } from 'zod'

const envSchema = z.object({
    NEXT_PUBLIC_DISPLAY: z.enum(['development', 'production']),
    NEXT_PUBLIC_ORIGIN: z.string().default('https://arenavs.com'),
    POLYGON_MAINNET_DSN: z.string(),
    POLYGON_TESTNET_DSN: z.string(),
    SKALE_TESTNET_DSN: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_FS_URL: z.string(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    NEXT_PUBLIC_RAFFLE_WHEEL_ALIAS: z.string(),
    NEXT_PUBLIC_STAKING_ID: z.string(),
})

export const ENV = envSchema.parse({
    NEXT_PUBLIC_DISPLAY: process.env.NEXT_PUBLIC_DISPLAY,
    NEXT_PUBLIC_ORIGIN: process.env.NEXT_PUBLIC_ORIGIN,
    POLYGON_MAINNET_DSN: process.env.POLYGON_MAINNET_DSN,
    POLYGON_TESTNET_DSN: process.env.POLYGON_TESTNET_DSN,
    SKALE_TESTNET_DSN: process.env.SKALE_TESTNET_DSN,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FS_URL: process.env.NEXT_PUBLIC_FS_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_RAFFLE_WHEEL_ALIAS: process.env.NEXT_PUBLIC_RAFFLE_WHEEL_ALIAS,
    NEXT_PUBLIC_STAKING_ID: process.env.NEXT_PUBLIC_STAKING_ID,
})

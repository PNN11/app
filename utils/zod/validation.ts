import { z } from 'zod'

export const withdrawValidationSchema = z.object({
    _id: z.string(),
    payload: z.object({ nonce: z.number(), signature: z.string() }),
})

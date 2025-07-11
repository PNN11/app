// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}
const statusCode200 = 200

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
    res.status(statusCode200).json({ name: 'John Doe' })
}

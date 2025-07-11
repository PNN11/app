// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
): Promise<void> {
    const { accessToken, gameAssetId } = req.query

    try {
        const response = await axios.post<{ redirectUrl: string }>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/game-asset/${gameAssetId}/buy/binance`,
            null,
            {
                headers: {
                    'access-token': accessToken,
                },
            }
        )

        res.redirect(response.data.redirectUrl)
    } catch (e) {
        res.redirect('/profile')
    }
}

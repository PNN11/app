import { FC, useMemo } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import TelegramIcon from 'components/svg/telegramIcon'
import TwitterIcon from 'components/svg/twitterIcon'
import { useLocation } from 'hooks/useLocation'

interface SocialShareBlockProps {
    nft: IMarketplaceToken.TBodyResponse
}

const SocialShareBlock: FC<SocialShareBlockProps> = ({ nft }) => {
    const location = useLocation()
    const url = useMemo(() => `${location?.origin}/nft/${nft._id}`, [location, nft])

    return (
        <div className="flex flex-col gap-2">
            <p>Share to</p>
            <div className="flex gap-2">
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://t.me/share/url?url=${encodeURI(url)}`}
                    className="bg-chrysler-blue rounded"
                >
                    <TelegramIcon />
                </a>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://twitter.com/share?url=${encodeURI(url)}`}
                    className="bg-chrysler-blue rounded"
                >
                    <TwitterIcon />
                </a>
                {/* <a */}
                {/*    target="_blank" */}
                {/*    rel="noreferrer" */}
                {/*    href="/" */}
                {/*    className="bg-chrysler-blue rounded" */}
                {/* > */}
                {/*    <MediumIcon /> */}
                {/* </a> */}
                {/* <a */}
                {/*    target="_blank" */}
                {/*    rel="noreferrer" */}
                {/*    href={`/`} */}
                {/*    className="bg-chrysler-blue rounded" */}
                {/* > */}
                {/*    <DiscordIcon /> */}
                {/* </a> */}
            </div>
        </div>
    )
}

export default SocialShareBlock

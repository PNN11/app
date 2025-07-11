import { FC, ReactNode } from 'react'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

import SkeletonLoadingCards, { SkeletonLoadingCardsProps, TCards } from '../ui/loaders/cards'

interface MarketplaceCardsWrapperProps {
    isLoading: boolean
    isError: boolean
    isFetched: boolean
    dataLength: number
    children: ReactNode
    limit?: number
    noDataMessage?: string
    loadingCardType?: TCards
    onScrollEnd?: () => void
    isFetchingNextPage?: boolean
    classes?: { skeletonLoading?: SkeletonLoadingCardsProps['classes']; cardsWrapper?: string }
}

const MarketplaceCardsWrapper: FC<MarketplaceCardsWrapperProps> = ({
    dataLength,
    isError,
    isFetched,
    isLoading,
    children,
    limit = 8,
    noDataMessage = 'According to your request NFTs was not found',
    loadingCardType,
    onScrollEnd,
    isFetchingNextPage,
    classes,
}) => {
    const { ref } = useInView({
        onChange(inView) {
            if (inView) onScrollEnd()
        },
        rootMargin: '360px',
    })

    return (
        <>
            <div
                className={twMerge(
                    'mb-4 grid grid-cols-1 gap-3 2xs:grid-cols-2 sm:grid-cols-nft-card-marketplace',
                    classes?.cardsWrapper
                )}
            >
                {children}
            </div>
            {(isLoading || isFetchingNextPage) &&
                (loadingCardType ? (
                    <SkeletonLoadingCards
                        classes={classes?.skeletonLoading}
                        count={limit}
                        type={loadingCardType}
                    />
                ) : (
                    <div className="mt-24 flex justify-center">
                        <Image
                            src="/img/loader.png"
                            alt="loading"
                            height={78}
                            width={78}
                            className="loading w-15 sm:w-19.5"
                        />
                    </div>
                ))}
            {!isLoading && !isError && isFetched && !dataLength ? (
                <div className="mt-14 text-center text-base-300">{noDataMessage}</div>
            ) : null}
            {isError && !dataLength ? (
                <div className="mt-14 text-center text-base-300">
                    There was an error during fetching
                </div>
            ) : null}

            {onScrollEnd && <div ref={ref} />}
        </>
    )
}

export default MarketplaceCardsWrapper

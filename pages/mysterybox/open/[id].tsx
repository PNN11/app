import { useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import SellNftPreview from 'components/marketplace/nft/sell/sellNftPreview'
import OpenMysteryBox from 'components/modals/nft/openMysteryBox'
import { useModal } from 'hooks/useModal'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import { MarketplaceService } from 'services/api/marketplace'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

interface OpenMysteryBoxPageProps {
    id: string
}

const OpenMysteryBoxPage: NextPage<OpenMysteryBoxPageProps> = ({ id }) => {
    const [isOpen, open, close] = useModal()

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const { data: mysteryBox } = useQuery(
        [QueryKeys.GET_MYSTERY_BOX, id],
        () => marketplaceService.getToken({ id }),
        {
            onSuccess(data) {
                setOpened(data.payload.isOpen)
            },
        }
    )

    const [opened, setOpened] = useState(mysteryBox?.payload?.isOpen)

    useSubscribeToNFTEvent(`open-${mysteryBox._id}`, () => {
        setOpened(true)
    })

    return (
        <PageWrapper>
            <Container className="mb-3 grid grid-cols-1 gap-0 pb-20 pt-3 lg:mb-0 lg:grid-cols-2 lg:gap-4 lg:pt-5">
                <div className="contents lg:block">
                    <div className="order-1 mb-2 text-custom-4xl">{mysteryBox.payload.name}</div>
                    <div className="order-2 mb-6 text-base-100/70">
                        {mysteryBox.payload.description}
                    </div>
                    {!opened && (
                        <div className="order-4 grid grid-cols-2 gap-4">
                            <MarketplaceButton variant="secondary" onClick={open}>
                                Click to reveal
                            </MarketplaceButton>
                            <Link href={`/nft/sell/${mysteryBox._id}`}>
                                <MarketplaceButton>List NFT</MarketplaceButton>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="order-3 mb-8 lg:mb-0">
                    <SellNftPreview
                        priceValue={mysteryBox.priceAmount}
                        nft={mysteryBox}
                        activePrice={mysteryBox.currency}
                    />
                </div>
            </Container>
            <OpenMysteryBox close={close} isOpen={isOpen} mysteryBox={mysteryBox} />
        </PageWrapper>
    )
}

export default OpenMysteryBoxPage

export const getServerSideProps: GetServerSideProps = async context => {
    const { id = '' } = context.query
    const queryClient = new QueryClient()
    const marketplaceService = new MarketplaceService()

    await queryClient.prefetchQuery([QueryKeys.GET_MYSTERY_BOX, id], () =>
        marketplaceService.getToken({ id: id as string })
    )

    return { props: { id, dehydratedState: dehydrate(queryClient) } }
}

import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import NftAccordionWrapper from 'components/marketplace/nft/nftAccordionWrapper'

interface BoxContentsProps {
    series: IMarketplaceToken.TSerie[]
}

const BoxContents: FC<BoxContentsProps> = ({ series }) => {
    return (
        <NftAccordionWrapper title="Contents of the box">
            <div className="mt-1 mb-1 grid max-h-50 grid-cols-1 gap-x-3 gap-y-2 overflow-auto pr-3 s:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {series
                    ? series.map(({ series, probability, issueAmount }) => (
                          <div key={series} className="rounded-lg bg-base-650 p-3">
                              <div className="flex flex-col justify-between space-y-3">
                                  <div className="font-medium uppercase">{series}</div>
                                  <div className="space-y-1 text-xs">
                                      <div className="flex items-center justify-between gap-2">
                                          <div className="text-base-300">Quantity</div>
                                          <div>{issueAmount}</div>
                                      </div>
                                      <div className="flex items-center justify-between gap-2">
                                          <div className="text-base-300">Chance</div>
                                          <div>{probability}%</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </NftAccordionWrapper>
    )
}

export default BoxContents

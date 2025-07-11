import { FC } from 'react'

import Image from 'next/image'

import EcosystemInfo from './info'
import EcosystemWrapper from './wrapper'

import { Pages } from 'common-types/pages'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

type EcosystemProps = Pages.AboutUsTextContent['ecosystem']

const Ecosystem: FC<EcosystemProps> = ({ description, title }) => {
    return (
        <BlockWrapper>
            <EcosystemWrapper>
                <EcosystemInfo title={title} description={description} />
                <div className="relative flex items-center justify-center xl:block">
                    <Image
                        src="/images/aboutUsPage/ecosystem.png"
                        alt="ecosystem"
                        width={639}
                        height={579}
                        quality={100}
                        className="hidden md:block xl:absolute xl:translate-y-[-16%]"
                    />
                    <Image
                        src="/images/aboutUsPage/ecosystem-mobile-2.png"
                        alt="ecosystem"
                        width={310}
                        height={375}
                        quality={100}
                        className="md:hidden"
                    />
                </div>
            </EcosystemWrapper>
        </BlockWrapper>
    )
}

export default Ecosystem

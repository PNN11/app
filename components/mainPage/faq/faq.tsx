import { FC } from 'react'

import TitleWithDescription from '../titleWIthDescription'

import { FAQDropdownList } from './dropdown'

import { MainPage } from 'common-types/mainPage'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

interface FaqProps {
    items: MainPage.Faq[]
}

const Faq: FC<FaqProps> = ({ items }) => {
    return (
        <BlockWrapper>
            <div className="mx-auto max-w-6xl px-3 sm:px-12 xl:px-0" data-aos="fade-zoom-in">
                <div className="text-center">
                    <TitleWithDescription
                        title="Frequently Asked Questions (FAQ)"
                        description="Find answers to the most common questions about Arena Games and our
                        platform:"
                    />
                </div>
                <FAQDropdownList faqs={items} />
            </div>
        </BlockWrapper>
    )
}

export default Faq

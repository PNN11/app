import { FC } from 'react'

import { MainPage } from 'common-types/mainPage'
import Accordion from 'components/common/ui/accordion'
import RichTextPreview from 'components/postElements/richTextPreview'
import Chevron from 'components/svg/chevron'
import { WithClassName } from 'utils/types/common'

type FaqProps = WithClassName<{
    question: MainPage.Faq
    open: boolean
    onClick: () => void
}>

const FAQItem: FC<FaqProps> = ({ question, open, onClick, className }) => {
    if (!question.answer) return null

    return (
        <div className={`h-fit rounded-xl border border-base-700 p-6 ${className ?? ''}`}>
            <div
                onClick={onClick}
                className="group grid cursor-pointer grid-cols-fr-max items-center"
            >
                <div className="text-xl font-medium transition-opacity group-hover:opacity-[0.85] lg:text-custom-2.5xl">
                    {question.question}
                </div>
                <div className={`transition-transform ${open ? 'rotate-180' : ''}`}>
                    <Chevron />
                </div>
            </div>
            <Accordion open={open}>
                <RichTextPreview content={question.answer} />
            </Accordion>
        </div>
    )
}

export default FAQItem

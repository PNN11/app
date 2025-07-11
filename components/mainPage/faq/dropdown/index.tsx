import { FC, useState } from 'react'

import FAQItem from './item'

import { MainPage } from 'common-types/mainPage'

interface Props {
    faqs: MainPage.Faq[]
}

const renderFaqItems = (
    items: MainPage.Faq[],
    currentIndex: number,
    setCurrentIndex: (value: number) => void
): JSX.Element[] =>
    items?.length
        ? items.map((q, index) => (
              <FAQItem
                  question={q}
                  key={q.id}
                  onClick={() => {
                      if (currentIndex === index) return setCurrentIndex(-1)

                      setCurrentIndex(index)
                  }}
                  open={index === currentIndex}
              />
          ))
        : null

export const FAQDropdownList: FC<Props> = ({ faqs }) => {
    const [currentIndex, setCurrentIndex] = useState(-1)

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="hidden space-y-4 md:block">
                {renderFaqItems(
                    faqs?.map((faq, i) => !(i % 2) && faq),
                    currentIndex,
                    setCurrentIndex
                )}
            </div>
            <div className="hidden space-y-4 md:block">
                {renderFaqItems(
                    faqs?.map((faq, i) => i % 2 && faq),
                    currentIndex,
                    setCurrentIndex
                )}
            </div>
            <div className="space-y-4 md:hidden">
                {renderFaqItems(faqs, currentIndex, setCurrentIndex)}
            </div>
        </div>
    )
}

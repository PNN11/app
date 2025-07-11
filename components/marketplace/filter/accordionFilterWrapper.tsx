import { ReactNode, useEffect } from 'react'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import AccordionWrapper from 'components/common/ui/accordionWrapper'
import { CheckboxWithLabel } from 'components/common/ui/checkbox/checkboxWithLabel'

interface AccordionFilterWrapperProps<T> {
    items: T[]
    title: string
    disabled?: boolean
    isLoading?: boolean
    isError?: boolean
    defaultOpenState?: boolean
    itemToLabel: (item: T) => ReactNode
    itemToIcon?: (item: T) => string
    itemToKey: (item: T) => string
    isChecked: (item: T) => boolean
    renderIf?: (item: T) => boolean
    onClickItem: (item: T) => void
    onReachEnd?: () => void
}

type AccordionFilterWrapperType = <T = unknown>(
    props: AccordionFilterWrapperProps<T>
) => JSX.Element

const AccordionFilterWrapper: AccordionFilterWrapperType = ({
    items,
    title,
    disabled = false,
    isLoading = false,
    isError = false,
    defaultOpenState = false,
    isChecked,
    itemToIcon,
    itemToKey,
    itemToLabel,
    renderIf = () => true,
    onClickItem,
    onReachEnd,
}) => {
    const { ref, inView } = useInView({ threshold: 1 })

    useEffect(() => {
        if (inView) {
            onReachEnd()
        }
    }, [inView, onReachEnd])

    return (
        <AccordionWrapper
            title={title}
            disabled={disabled}
            classes={{ title: 'pb-2', wrapper: 'pt-3 pb-1' }}
            defaultOpenState={defaultOpenState}
        >
            <div className="relative max-h-60 overflow-auto">
                {!isLoading && !isError && items?.length
                    ? items.map(item => {
                          return renderIf(item) ? (
                              <CheckboxWithLabel
                                  key={itemToKey(item)}
                                  className="pr-5 2xs:py-1"
                                  onClick={onClickItem}
                                  value={item}
                                  checked={isChecked(item)}
                                  id={itemToKey(item)}
                              >
                                  <div className="flex cursor-pointer items-center gap-[0.3125rem]">
                                      {itemToIcon ? (
                                          <Image
                                              src={itemToIcon(item)}
                                              width={14}
                                              height={18}
                                              alt="logo"
                                          />
                                      ) : null}
                                      <div className="text-custom-sl">{itemToLabel(item)}</div>
                                  </div>
                              </CheckboxWithLabel>
                          ) : null
                      })
                    : null}
                {onReachEnd && <div className="border-none" ref={ref} />}
            </div>
        </AccordionWrapper>
    )
}

export default AccordionFilterWrapper

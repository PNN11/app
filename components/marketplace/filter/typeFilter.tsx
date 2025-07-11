import { FC } from 'react'

import { MarketplaceFilter, TTypeFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import AccordionWrapper from 'components/common/ui/accordionWrapper'
import SmallButton from 'components/common/ui/buttons/smallButton'

const typeLabels: Record<TTypeFilter, string> = {
    MYSTER_BOX: 'Mystery Box',
    TOKEN_ERC721: 'NFT',
}

const TypeFilter: FC = () => {
    const [type, setType] = useFilterState<Pick<MarketplaceFilter, 'type'>, TTypeFilter>(
        store => store.type,
        value => ({ type: value })
    )

    const handleClick = (buttonType: TTypeFilter): void => {
        if (type === buttonType) {
            setType(undefined)

            return
        }

        setType(buttonType)
    }

    return (
        <AccordionWrapper title="Type" classes={{ title: 'pb-2', wrapper: 'py-2' }}>
            <div className="flex items-center justify-center gap-2">
                <SmallButton
                    className="w-38 py-3"
                    onClick={() => handleClick('TOKEN_ERC721')}
                    variant={type === 'TOKEN_ERC721' ? 'primary' : 'secondary'}
                >
                    NFT
                </SmallButton>
                <SmallButton
                    className="w-38 py-3"
                    onClick={() => handleClick('MYSTER_BOX')}
                    variant={type === 'MYSTER_BOX' ? 'primary' : 'secondary'}
                >
                    Mystery box
                </SmallButton>
            </div>
        </AccordionWrapper>
    )
}

export default TypeFilter

export const TypePreview: FilterPreview<Pick<MarketplaceFilter, 'type'>, string> = {
    selector: store => store.type,
    Component: ({ value }) => <div>{typeLabels[value]}</div>,
}

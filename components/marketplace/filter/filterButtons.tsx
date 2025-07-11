import { FC } from 'react'

import SmallButton from 'components/common/ui/buttons/smallButton'
import useFilterStore from 'store/useFilterStore'

interface FilterButtonsProps {
    open: boolean
    setOpen: (value: boolean) => void
}

const FilterButtons: FC<FilterButtonsProps> = ({ open, setOpen }) => {
    const setFilter = useFilterStore(state => state.setFilter)

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-10 flex w-full gap-3 bg-base-700 py-3 lg:hidden ${
                open ? 'px-2' : 'px-6'
            }`}
        >
            {open ? (
                <>
                    <SmallButton
                        variant="inline"
                        className="w-full py-3 2xs:text-custom-lg"
                        onClick={() => setFilter(undefined)}
                    >
                        Clear All
                    </SmallButton>
                    <SmallButton
                        className="w-full py-3 2xs:text-custom-lg"
                        onClick={() => setOpen(false)}
                    >
                        Done
                    </SmallButton>
                </>
            ) : (
                <SmallButton
                    onClick={() => setOpen(true)}
                    className="w-full py-3 2xs:text-custom-lg"
                >
                    Filter
                </SmallButton>
            )}
        </div>
    )
}

export default FilterButtons

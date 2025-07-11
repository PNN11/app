import { FC } from 'react'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import useLoggedIn from 'hooks/useLoggedIn'

type PropsType = { onClick: () => void }

export const BuyButton: FC<PropsType> = ({ onClick }) => {
    const ifLogged = useLoggedIn()

    return (
        <SmallButton
            onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                ifLogged().then(() => onClick())
            }}
            className="w-full"
        >
            Buy
        </SmallButton>
    )
}

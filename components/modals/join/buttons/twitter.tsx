import { FC } from 'react'

import { BaseButton } from './base'

import Twitter from 'components/svg/twitter'

export const TwitterButton: FC = () => {
    return (
        <BaseButton className="bg-twitter" href="https://twitter.com/Arenaweb3" Icon={Twitter}>
            Follow Us
        </BaseButton>
    )
}

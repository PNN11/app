import { FC, ReactElement } from 'react'

import { ENV } from 'env'

export const Development: FC<{ children: ReactElement }> = ({ children }) => {
    if (ENV.NEXT_PUBLIC_DISPLAY !== 'development') return null

    return children
}

import { FC, ReactElement } from 'react'

import { ENV } from 'env'

export const Production: FC<{ children: ReactElement }> = ({ children }) => {
    if (ENV.NEXT_PUBLIC_DISPLAY !== 'production') return null

    return children
}

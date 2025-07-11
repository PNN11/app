import { forwardRef } from 'react'

import { useRouter } from 'next/router'

const SubHeader = forwardRef<HTMLDivElement>((props, ref) => {
    const { asPath } = useRouter()

    return (
        <div
            ref={ref}
            className={`overflow-hidden bg-subheader text-center ${
                asPath.includes('auth') ? 'h-0 p-0' : 'h-max p-4'
            }`}
        >
            Marketplace is in Beta, errors might happen!
        </div>
    )
})

export default SubHeader

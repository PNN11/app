import { FC } from 'react'

import { Container } from 'components/common/wrappers/container'
import SwapBlock from 'components/swap/swapBlock'

const Swap: FC = () => {
    return (
        <Container className="mt-23">
            <div className="">
                <SwapBlock />
            </div>
        </Container>
    )
}

export default Swap

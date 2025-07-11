import { FC } from 'react'

import { AnimatedSpin } from 'components/svg/animatedSpin'
import { CheckStepSvg } from 'components/svg/checkStepSvg'

interface PropsType {
    number: number
    active: boolean
    completed: boolean
}

const Step: FC<PropsType> = ({ active = false, completed = false, number = 1 }) => {
    return (
        <div className="relative flex items-center justify-center">
            {completed ? (
                <CheckStepSvg />
            ) : (
                <>
                    <AnimatedSpin active={active} />
                    <p className="absolute">{number}</p>
                </>
            )}
        </div>
    )
}

export default Step

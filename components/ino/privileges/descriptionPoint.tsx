import { FC } from 'react'

import Image from 'next/image'

interface Props {
    text: string
    icon: string
    classes?: { text?: string; wrapper?: string }
}

const DescriptionPoint: FC<Props> = ({ icon, text, classes = { text: '', wrapper: '' } }) => {
    return (
        <li className={`grid grid-cols-[2.5rem,1fr] items-center gap-2 ${classes.wrapper}`}>
            <Image src={icon} width={40} height={40} alt="icon" />
            <div className={classes.text}>{text}</div>
        </li>
    )
}

export default DescriptionPoint

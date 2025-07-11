import { FC, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import { useWindowSize } from 'hooks/useWindowSize'

type PropsType = {
    children: JSX.Element
}
const SubheaderPortal: FC<PropsType> = ({ children }) => {
    const [container, setContainer] = useState(undefined)
    const windowSize = useWindowSize()

    useEffect(() => {
        if (windowSize.width <= 1024) {
            setContainer(document.querySelector('#bottom-menu'))
        } else {
            setContainer(document.querySelector('#header #sub-header'))
        }
    }, [windowSize])

    if (!container || !children || typeof children === 'boolean') return null

    return createPortal(children, container)
}

export default SubheaderPortal

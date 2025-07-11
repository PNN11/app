import { MutableRefObject, useState } from 'react'

type RemoveOrAddTransitionFuncParams = {
    ref: MutableRefObject<HTMLDivElement | HTMLUListElement>
    width?: number
    className?: string
}

type RemoveOrAddTransitionFunc = (params: RemoveOrAddTransitionFuncParams) => void

const useAddOrRemoveTransition = (): {
    classes: string
    handleRemoveOrAddTransition: RemoveOrAddTransitionFunc
} => {
    const [classes, setClasses] = useState('')

    const handleRemoveOrAddTransition: RemoveOrAddTransitionFunc = ({
        ref,
        width = 1024,
        className = 'transition-all duration-700',
    }): void => {
        const classes = className.split(' ')

        if (window.innerWidth < width && !ref.current.classList.contains(classes[0])) {
            setClasses(className)
        }
        if (window.innerWidth >= width && ref.current.classList.contains(classes[0])) {
            setClasses('')
        }
    }

    return { classes, handleRemoveOrAddTransition }
}

export default useAddOrRemoveTransition

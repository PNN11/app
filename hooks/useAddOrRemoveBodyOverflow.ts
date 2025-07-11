import { useEffect } from 'react'

const useAddOrRemoveBodyOverflow = (isOpen: boolean): void => {
    useEffect(() => {
        const padding = window.innerWidth - document.body.clientWidth

        if (isOpen) {
            document.body.classList.add('overflow-hidden')
            document.body.style.paddingRight = `${padding}px`
        } else {
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = '0'
        }

        return () => {
            document.body.classList.remove('overflow-hidden')
            document.body.style.paddingRight = '0'
        }
    }, [isOpen])
}

export default useAddOrRemoveBodyOverflow

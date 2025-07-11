import { useCallback, useState } from 'react'

export const useModal = (
    defaultState: boolean = false
): [isOpen: boolean, open: () => void, close: () => void] => {
    const [isOpen, setIsOpen] = useState(defaultState)

    const close = useCallback(() => setIsOpen(false), [])
    const open = useCallback(() => setIsOpen(true), [])

    return [isOpen, open, close]
}

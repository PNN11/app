import {
    FC,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'

import ReactDOM from 'react-dom'

import useAddOrRemoveBodyOverflow from 'hooks/useAddOrRemoveBodyOverflow'

type PropsType = {
    isOpen: boolean
    children: any
    onClose?: () => void
}
export const ModalOverlay: FC<PropsType> = ({ children, onClose, isOpen }) => {
    const [container, setContainer] = useState(undefined)

    useEffect(() => {
        setContainer(document.querySelector('#modals') as SetStateAction<any>)
    }, [])

    const ref = useRef() as MutableRefObject<HTMLDivElement>

    const handleClick = useCallback(
        (e: any) => {
            e.stopPropagation()

            if (e.target === ref.current) {
                onClose?.call(null)
            }
        },
        [onClose]
    )

    useAddOrRemoveBodyOverflow(isOpen)

    if (!container || !children || !isOpen) return null

    return (
        <>
            {ReactDOM.createPortal(
                <div
                    id="modal"
                    ref={ref}
                    onClick={handleClick}
                    className="translate-z-12 fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-bg bg-opacity-50 p-4 text-base-100"
                >
                    {children}
                </div>,
                container
            )}
        </>
    )
}

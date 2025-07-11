export interface IModal {
    className?: string
    isOpen: boolean
    open?: (arg0: string) => void
    close: () => void
    customClasses?: boolean
    onSideClick?: () => void
}
